from anthropic import AsyncAnthropic
from app.config import settings
from app.models import LeetCodeProblem, TagResult
import re

HINT_SYSTEM = """You are a Socratic coding tutor. Your job is to give hints that push the user to think — never to give away the answer.

You will be given:
- A LeetCode problem
- The DSA patterns that apply
- A hint level (1, 2, or 3)

Hint Level Rules:
- Level 1 (Conceptual Nudge): Guide the user's thinking without naming any specific algorithm, data structure, or pattern. Use analogies or directional questions. 2-3 sentences max.
- Level 2 (Pattern Hint): Name the DSA pattern that applies and explain in 2-3 sentences why it fits this specific problem. Do NOT explain how to implement it.
- Level 3 (Implementation Hint): Give one concrete implementation-level detail — a key variable name, a key check, or a key formula — without writing actual code. 2-4 sentences.

Critical rules:
- Never write code of any kind
- Never reveal the full solution logic
- Each level should feel like a natural step up from the previous
- Be specific to THIS problem, not generic"""


def _strip_html(html: str) -> str:
    text = re.sub(r"<[^>]+>", "", html)
    text = re.sub(r"&nbsp;", " ", text)
    text = re.sub(r"&lt;", "<", text)
    text = re.sub(r"&gt;", ">", text)
    return text.strip()


async def generate_hint(
    problem: LeetCodeProblem,
    tag_result: TagResult,
    level: int,
) -> str:
    client = AsyncAnthropic(api_key=settings.anthropic_api_key)
    plain_text = _strip_html(problem.question)

    human_message = f"""Problem: {problem.title} ({problem.difficulty})
DSA Patterns: {', '.join(tag_result.patterns)}

Problem Description:
{plain_text[:2000]}

Give me a Level {level} hint for this problem."""

    response = await client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        system=HINT_SYSTEM,
        messages=[{"role": "user", "content": human_message}],
    )
    return response.content[0].text
