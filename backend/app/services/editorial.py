import re

from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

from app.config import settings
from app.models import Editorial, LeetCodeProblem, TagResult

TAGGER_SYSTEM = """You are a DSA pattern classifier. Given a LeetCode problem, identify which algorithmic patterns apply.

Choose from these patterns:
- Two Pointers
- Sliding Window
- Binary Search
- Prefix Sum
- Hash Map / Hash Set
- Stack
- Monotonic Stack
- Queue / Deque
- Linked List
- Trees (BFS)
- Trees (DFS)
- Binary Search Tree
- Trie
- Heap / Priority Queue
- Graph (BFS)
- Graph (DFS)
- Topological Sort
- Union Find
- Backtracking
- Dynamic Programming (1D)
- Dynamic Programming (2D)
- Greedy
- Intervals
- Bit Manipulation
- Math
- Simulation
- Design
- Divide and Conquer

Return ONLY the patterns that directly apply (usually 1-3). Provide brief reasoning."""

EDITORIALIST_SYSTEM = """You are an expert Algorithm Engineer and Technical Educator. Your mission is to write \
a high-quality, intuitive LeetCode editorial. You prioritize the "why" over the "how."

The identified DSA patterns for this problem are: {patterns}

Your response must follow this strict structure:

1. **intuition** — The "Aha!" Moment: Explain the problem in plain English. Describe the mental model \
required to solve it. Why does the identified pattern (e.g., Sliding Window, Dynamic Programming) fit here? \
Be encouraging and clear.

2. **visual_walkthrough** — Provide a step-by-step ASCII diagram or a markdown table tracing a sample input. \
Show how pointers move or how the stack/queue changes over 2-3 key iterations. Use markdown formatting \
(code blocks for ASCII art, tables where appropriate).

3. **approaches** — Provide multiple approaches, from naive to optimal:
   - Each approach needs a short descriptive name (e.g., "Brute Force", "Optimized with Hash Map").
   - For the naive approach, briefly explain the logic and why it is inefficient.
   - For optimized approaches, explain the optimization clearly. What redundant work are we removing? \
     Build on why the previous approach falls short.

4. **time_complexity** — Use LaTeX notation (e.g., \\mathcal{{O}}(N), \\mathcal{{O}}(N \\log N)). \
Break down what part of the code drives the complexity.

5. **space_complexity** — Same LaTeX format. Explain what data structures contribute to space usage.

6. **code** — A clean, well-commented Python 3 solution. Use descriptive variable names. \
Avoid "clever" one-liners that sacrifice readability.

7. **edge_cases** — List 2-3 specific scenarios (e.g., empty input, large constraints, negative values, \
single element) and briefly explain how the solution handles them.

**Style**: Be encouraging and clear. Avoid showing off with overly complex syntax. If the problem has \
a known "trick," explain the reasoning to discover that trick rather than just presenting it."""

HUMAN_TEMPLATE = """Please generate a complete editorial for the following LeetCode problem:

**Problem Title**: {problem_title}
**Difficulty**: {difficulty}
**Problem Description**:
{problem_description}

**Constraints**:
{constraints}

**Additional Metadata/Tags**:
{metadata}"""


def _strip_html(html: str) -> str:
    text = re.sub(r"<[^>]+>", "", html)
    text = re.sub(r"&nbsp;", " ", text)
    text = re.sub(r"&lt;", "<", text)
    text = re.sub(r"&gt;", ">", text)
    text = re.sub(r"&amp;", "&", text)
    text = re.sub(r"&quot;", '"', text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def _extract_constraints(plain_text: str) -> tuple[str, str]:
    """Try to split constraints from the problem description."""
    # Common pattern: "Constraints:" section at the end
    match = re.split(r"\n\s*Constraints?\s*:?\s*\n", plain_text, flags=re.IGNORECASE)
    if len(match) >= 2:
        return match[0].strip(), match[1].strip()
    return plain_text, "See problem description above."


def _get_llm() -> ChatGoogleGenerativeAI:
    return ChatGoogleGenerativeAI(
        model=settings.gemini_model,
        google_api_key=settings.google_api_key,
        temperature=0.3,
    )


async def generate_editorial(problem: LeetCodeProblem) -> tuple[TagResult, Editorial]:
    llm = _get_llm()
    plain_text = _strip_html(problem.question)
    description, constraints = _extract_constraints(plain_text)

    tags_str = ", ".join(t.get("name", "") for t in problem.topicTags if t.get("name"))
    metadata = tags_str if tags_str else "None"

    # Step 1: Tag the problem with DSA patterns
    tagger_prompt = ChatPromptTemplate.from_messages([
        ("system", TAGGER_SYSTEM),
        ("human", "Problem: {title}\n\n{description}"),
    ])
    tagger_chain = tagger_prompt | llm.with_structured_output(TagResult)
    tag_result = await tagger_chain.ainvoke({
        "title": problem.title,
        "description": plain_text,
    })

    # Step 2: Generate the editorial with patterns context
    editorial_prompt = ChatPromptTemplate.from_messages([
        ("system", EDITORIALIST_SYSTEM),
        ("human", HUMAN_TEMPLATE),
    ])
    editorial_chain = editorial_prompt | llm.with_structured_output(Editorial)
    editorial = await editorial_chain.ainvoke({
        "patterns": ", ".join(tag_result.patterns),
        "problem_title": problem.title,
        "difficulty": problem.difficulty,
        "problem_description": description,
        "constraints": constraints,
        "metadata": metadata,
    })

    return tag_result, editorial
