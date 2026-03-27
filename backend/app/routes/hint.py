from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app import cache
from app.services.editorial import generate_editorial
from app.services.hint import generate_hint
from app.services.leetcode import fetch_problem

router = APIRouter()


class HintRequest(BaseModel):
    level: int  # 1, 2, or 3


@router.post("/hint/{slug}")
async def hint(slug: str, body: HintRequest):
    if body.level not in (1, 2, 3):
        raise HTTPException(status_code=400, detail="Hint level must be 1, 2, or 3")

    try:
        problem = await fetch_problem(slug)
    except Exception as exc:
        raise HTTPException(status_code=404, detail=f"Problem not found: {exc}")

    # Try to get tag_result from the editorial cache first
    cached = cache.get(slug)
    if cached:
        from app.models import TagResult

        tag_result = TagResult(
            patterns=cached.patterns,
            reasoning=cached.pattern_reasoning,
        )
    else:
        # Generate editorial to get tag_result (also caches it for future use)
        try:
            tag_result, editorial = await generate_editorial(problem)
        except Exception as exc:
            raise HTTPException(
                status_code=502, detail=f"Failed to analyze problem: {exc}"
            )

    try:
        hint_text = await generate_hint(
            problem=problem,
            tag_result=tag_result,
            level=body.level,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=502, detail=f"Failed to generate hint: {exc}"
        )

    return {"hint": hint_text, "level": body.level}
