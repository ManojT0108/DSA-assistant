import httpx

from app.config import settings
from app.models import LeetCodeProblem

_client = httpx.AsyncClient(base_url=settings.leetcode_api_base, timeout=30.0)


async def fetch_problem(slug: str) -> LeetCodeProblem:
    resp = await _client.get("/select", params={"titleSlug": slug})
    resp.raise_for_status()
    data = resp.json()
    return LeetCodeProblem(
        questionId=data.get("questionId", ""),
        title=data.get("questionTitle", ""),
        titleSlug=slug,
        difficulty=data.get("difficulty", ""),
        question=data.get("question", ""),
        topicTags=data.get("topicTags", []),
        hints=data.get("hints", []),
    )


async def fetch_daily_slug() -> str:
    resp = await _client.get("/daily")
    resp.raise_for_status()
    data = resp.json()
    return data["titleSlug"]
