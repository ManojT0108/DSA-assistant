from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app import cache
from app.services.assistant import generate_assistance
from app.services.leetcode import fetch_problem

router = APIRouter()


class ConversationMessage(BaseModel):
    role: str  # 'user' or 'assistant'
    content: str


class AssistRequest(BaseModel):
    user_code: str
    language: str = "python"
    mode: str = "debug"
    extra_context: str = ""
    failed_input: str | None = None
    expected_output: str | None = None
    actual_output: str | None = None
    conversation_history: list[ConversationMessage] = []


@router.post("/assist/{slug}")
async def assist(slug: str, body: AssistRequest):
    try:
        problem = await fetch_problem(slug)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Failed to fetch problem: {exc}")

    cache_key = f"tags:{slug}"
    tag_result = cache.get_tags(cache_key)
    if not tag_result:
        from app.services.editorial import run_tagger

        tag_result = await run_tagger(problem)
        cache.put_tags(cache_key, tag_result)

    response_text = await generate_assistance(
        problem=problem,
        tag_result=tag_result,
        user_code=body.user_code,
        language=body.language,
        mode=body.mode,
        extra_context=body.extra_context,
        failed_input=body.failed_input,
        expected_output=body.expected_output,
        actual_output=body.actual_output,
        conversation_history=[
            {"role": m.role, "content": m.content}
            for m in body.conversation_history
        ],
    )
    return {"response": response_text}
