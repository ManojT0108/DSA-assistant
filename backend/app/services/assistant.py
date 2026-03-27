from anthropic import AsyncAnthropic

from app.config import settings
from app.models import LeetCodeProblem, TagResult

import re

SYSTEM_PROMPT_DEBUG = """You are an expert software engineer and Socratic coding tutor helping a user debug their LeetCode solution.

You have been given:
- The problem description and constraints
- The DSA patterns that apply to this problem
- The user's current code (which may be incomplete or partially written)
- Optionally: a failing test case with expected vs actual output
- Optionally: extra context from the user

Your job:
1. Identify exactly where the code goes wrong or where the user seems stuck
2. Explain the issue clearly in plain English — reference the specific line, logic flaw, or missing piece
3. Give a conceptual hint about what to do next or how to fix it — describe the approach in words
4. If a failing test case is provided, trace through the user's code with that input to show where it diverges from expected behavior

CRITICAL RULES — you MUST follow these:
- NEVER write corrected code, completed code, or full solutions
- NEVER show code blocks with the fix applied — describe the fix in words instead
- You may reference small pseudocode snippets (1-2 lines max) ONLY to illustrate a concept, but never provide working solution code
- If the user's code is incomplete, explain what logical step comes next and why — do NOT write it for them
- Your goal is to make the user THINK and arrive at the fix themselves

Use "we" and "let's" to keep it collaborative. Keep it concise. Think of yourself as a teaching assistant who points at the problem but hands the keyboard back to the student."""

SYSTEM_PROMPT_CONTINUE = """You are an expert software engineer and coding tutor helping a user continue writing their LeetCode solution.

You have been given:
- The problem description and constraints
- The DSA patterns that apply to this problem
- The user's current (incomplete) code
- Optionally: extra context from the user about their approach

Your job:
1. Understand what the user has written so far and what approach they're taking
2. Explain what the next logical step is and why
3. Provide the next section of code with clear comments
4. Do not write the entire solution — guide them step by step unless they explicitly ask for the full solution

Be specific to their code. Reference their variable names and structure."""


def _strip_html(html: str) -> str:
    text = re.sub(r"<[^>]+>", "", html)
    text = re.sub(r"&nbsp;", " ", text)
    text = re.sub(r"&lt;", "<", text)
    text = re.sub(r"&gt;", ">", text)
    text = re.sub(r"&amp;", "&", text)
    return text.strip()


async def generate_assistance(
    problem: LeetCodeProblem,
    tag_result: TagResult,
    user_code: str,
    language: str,
    mode: str,
    extra_context: str = "",
    failed_input: str = None,
    expected_output: str = None,
    actual_output: str = None,
    conversation_history: list[dict] = None,
) -> str:
    client = AsyncAnthropic(api_key=settings.anthropic_api_key)
    system_prompt = SYSTEM_PROMPT_DEBUG if mode == "debug" else SYSTEM_PROMPT_CONTINUE

    plain_text = _strip_html(problem.question)

    human_parts = [
        f"## Problem: {problem.title} ({problem.difficulty})",
        f"**DSA Patterns**: {', '.join(tag_result.patterns)}",
        f"\n## Problem Description\n{plain_text[:3000]}",
        f"\n## User's Code ({language})\n```{language}\n{user_code}\n```",
    ]

    if extra_context:
        human_parts.append(f"\n## Extra Context from User\n{extra_context}")

    if failed_input:
        human_parts.append("\n## Failing Test Case")
        human_parts.append(f"**Input**: {failed_input}")
        if expected_output:
            human_parts.append(f"**Expected Output**: {expected_output}")
        if actual_output:
            human_parts.append(f"**Actual Output (from their code)**: {actual_output}")

    initial_user_message = "\n".join(human_parts)

    # Build messages: if there's conversation history, include it as multi-turn
    if conversation_history:
        messages = [{"role": "user", "content": initial_user_message}]
        for msg in conversation_history:
            messages.append({"role": msg["role"], "content": msg["content"]})
    else:
        messages = [{"role": "user", "content": initial_user_message}]

    response = await client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=2048,
        system=system_prompt,
        messages=messages,
    )
    return response.content[0].text
