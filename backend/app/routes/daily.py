from fastapi import APIRouter, HTTPException

from app import cache
from app.models import EditorialResponse
from app.routes.solve import _parse_rate_limit_error
from app.services.editorial import generate_editorial
from app.services.leetcode import fetch_daily_slug, fetch_problem

router = APIRouter()


@router.get("/daily", response_model=EditorialResponse)
async def daily():
    try:
        slug = await fetch_daily_slug()
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Failed to fetch daily challenge: {exc}")

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
