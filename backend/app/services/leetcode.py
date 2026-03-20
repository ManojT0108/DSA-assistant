import asyncio

import httpx

from app.models import LeetCodeProblem

LEETCODE_GRAPHQL = "https://leetcode.com/graphql"

PROBLEM_QUERY = """
query getQuestionDetail($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    title
    titleSlug
    difficulty
    content
    topicTags {
      name
      slug
    }
    hints
    stats
  }
}
"""

DAILY_QUERY = """
query questionOfToday {
  activeDailyCodingChallengeQuestion {
    question {
      titleSlug
    }
  }
}
"""

_HEADERS = {
    "Content-Type": "application/json",
    "Referer": "https://leetcode.com",
}

_client = httpx.AsyncClient(timeout=30.0, headers=_HEADERS)

MAX_RETRIES = 3
BACKOFF_SECONDS = [2, 5, 10]


async def _graphql_with_retry(query: str, variables: dict | None = None) -> dict:
    """POST to LeetCode GraphQL with retry on 429 / 5xx."""
    payload = {"query": query}
    if variables:
        payload["variables"] = variables

    last_exc: Exception | None = None
    for attempt in range(MAX_RETRIES):
        try:
            resp = await _client.post(LEETCODE_GRAPHQL, json=payload)
            if resp.status_code == 429 or resp.status_code >= 500:
                last_exc = httpx.HTTPStatusError(
                    f"{resp.status_code}", request=resp.request, response=resp
                )
                await asyncio.sleep(BACKOFF_SECONDS[attempt])
                continue
            resp.raise_for_status()
            return resp.json()
        except httpx.HTTPStatusError:
            raise
        except httpx.HTTPError as exc:
            last_exc = exc
            await asyncio.sleep(BACKOFF_SECONDS[attempt])
    raise last_exc  # type: ignore[misc]


async def fetch_problem(slug: str) -> LeetCodeProblem:
    data = await _graphql_with_retry(PROBLEM_QUERY, {"titleSlug": slug})
    q = data["data"]["question"]
    return LeetCodeProblem(
        questionId=q.get("questionId", ""),
        title=q.get("title", ""),
        titleSlug=slug,
        difficulty=q.get("difficulty", ""),
        question=q.get("content", ""),
        topicTags=q.get("topicTags", []),
        hints=q.get("hints", []),
    )


async def fetch_daily_slug() -> str:
    data = await _graphql_with_retry(DAILY_QUERY)
    return data["data"]["activeDailyCodingChallengeQuestion"]["question"]["titleSlug"]
