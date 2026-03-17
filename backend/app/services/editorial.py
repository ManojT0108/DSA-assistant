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

EDITORIALIST_SYSTEM = """You are an expert LeetCode editorial writer. Write a clear, educational editorial for the given problem.

The identified DSA patterns are: {patterns}

Structure your response as:
- intuition: A clear 2-4 sentence explanation of the key insight
- approach: A list of numbered steps explaining the algorithm (each step should be 1-2 sentences)
- time_complexity: Big-O time complexity with brief justification (use LaTeX notation like O(n \\log n))
- space_complexity: Big-O space complexity with brief justification (use LaTeX notation)
- code: Clean, well-commented Python 3 solution"""


def _strip_html(html: str) -> str:
    text = re.sub(r"<[^>]+>", "", html)
    text = re.sub(r"&nbsp;", " ", text)
    text = re.sub(r"&lt;", "<", text)
    text = re.sub(r"&gt;", ">", text)
    text = re.sub(r"&amp;", "&", text)
    text = re.sub(r"&quot;", '"', text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def _get_llm() -> ChatGoogleGenerativeAI:
    return ChatGoogleGenerativeAI(
        model=settings.gemini_model,
        google_api_key=settings.google_api_key,
        temperature=0.3,
    )


async def generate_editorial(problem: LeetCodeProblem) -> tuple[TagResult, Editorial]:
    llm = _get_llm()
    plain_text = _strip_html(problem.question)

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
        ("human", "Problem: {title}\n\n{description}\n\nHints: {hints}"),
    ])
    editorial_chain = editorial_prompt | llm.with_structured_output(Editorial)
    editorial = await editorial_chain.ainvoke({
        "patterns": ", ".join(tag_result.patterns),
        "title": problem.title,
        "description": plain_text,
        "hints": "\n".join(problem.hints) if problem.hints else "None",
    })

    return tag_result, editorial
