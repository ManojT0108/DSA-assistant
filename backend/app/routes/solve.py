import re

from fastapi import APIRouter, HTTPException

from app import cache
from app.models import EditorialResponse
from app.services.editorial import generate_editorial
from app.services.leetcode import fetch_problem

router = APIRouter()


def _parse_rate_limit_error(exc: Exception) -> HTTPException | None:
    """Detect Gemini rate-limit errors and return a clean 429 response."""
    msg = str(exc)
    if "RESOURCE_EXHAUSTED" not in msg and "429" not in msg:
        return None

    retry_match = re.search(r"retryDelay.*?(\d+)s", msg)
    retry_seconds = int(retry_match.group(1)) if retry_match else 60

    return HTTPException(
        status_code=429,
        detail={
            "error": "rate_limited",
            "message": "The AI model's free-tier rate limit has been exceeded.",
            "retry_after": retry_seconds,
            "suggestions": [
                f"Wait ~{retry_seconds} seconds and try again.",
                "The daily quota resets at midnight Pacific Time.",
                "You can switch to a different Gemini model in the backend .env file.",
                "Or generate a new API key at aistudio.google.com/apikey.",
            ],
        },
    )


@router.post("/solve/{slug}", response_model=EditorialResponse)
async def solve(slug: str):
    cached = cache.get(slug)
    if cached:
        return cached

    try:
        problem = await fetch_problem(slug)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Failed to fetch problem: {exc}")

    try:
        tag_result, editorial = await generate_editorial(problem)
    except Exception as exc:
        rate_limit = _parse_rate_limit_error(exc)
        if rate_limit:
            raise rate_limit
        raise HTTPException(status_code=502, detail=f"Failed to generate editorial: {exc}")

    response = EditorialResponse(
        problem=problem,
        patterns=tag_result.patterns,
        pattern_reasoning=tag_result.reasoning,
        editorial=editorial,
    )
    cache.put(slug, response)
    return response
