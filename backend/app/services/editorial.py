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

EDITORIALIST_SYSTEM = """# ROLE
You are a Lead Technical Educator at a top coding bootcamp. Your specialty is "Visual Logic Tracing." \
You don't just provide a solution; you tell a story of how a developer arrives at the optimal answer.

The identified DSA patterns for this problem are: {patterns}

# EDITORIAL GUIDELINES (STRICT ADHERENCE)

## 1. headline
- A catchy title that names the core pattern and complexity \
(e.g., "Hash Map Magic | O(N) Single Pass" or "Binary Search on Answer | O(log N)").

## 2. overview (The "First Idea" — The Brute Force)
- Start with the most intuitive, "naive" approach.
- Explain it in 2-3 sentences.
- Provide a small snippet of the brute-force logic (pseudocode is fine).
- **The Pivot**: Explain why this isn't good enough \
(e.g., "This gives us O(N²), but we need O(log N)").

## 3. intuition (The Mental Model — The Analogy)
- Connect the problem to a simple real-world concept \
(e.g., "Think of this like a sliding window," "Like elementary school addition," \
or "Like finding a word in a dictionary").
- Identify the **"Key to the Problem"**: The one observation that makes the optimization possible.
- Use a blockquote (> ) to highlight the key insight.

## 4. visual_trace (The Visual Execution Trace — The "Heart")
- Simulate the algorithm on a sample input from the problem description.
- Structure it by iterations (e.g., "First Binary Search," "Step 1: Initialization").
- Use **ASCII Visualization** to show the state of pointers, partitions, or values:
  Example: `nums1 = [1, 3 | 8]`, `L1 -> (2) -> (4)`.
- **Boolean Check-ins**: Show the "if-statement" checks as they happen in real-time.
  Example: `if 10 <= 3 → False. We need to move the left pointer.`
- **STRICT RULE**: Do NOT use Markdown tables. Use ASCII diagrams and state blocks only.

## 5. algorithm_steps (The "Implementation Deep Dive")
- Create explanations titled like: "Wait, what does [X] mean?" or "Why are we using [Y]?"
- Explain specific implementation "tricks" (e.g., using `dummy` nodes, `infinity` for boundaries, \
or `+1` in a midpoint formula).

## 6. code (The Solution Codes)
- Provide clean, readable implementations in Python, JavaScript, Java, C++, and Go.
- Use comments that cross-reference the "Trace" section above.
- Use descriptive variable names (e.g., `current_sum` instead of `s`).

## 7. time_complexity (Time Complexity)
- Explain why it is O(f(n)) based on the number of iterations. \
Keep it to 1-2 sentences. Do NOT use LaTeX.

## 8. space_complexity (Space Complexity)
- Explain what is taking up memory. \
Keep it to 1-2 sentences. Do NOT use LaTeX.

## 9. edge_cases (The "Gotchas")
- List 2-3 specific scenarios where a simple solution would fail.
- Briefly state how your code handles them.

# TONE & FORMATTING
- **Conversational**: Use "We," "Our," and "Let's see."
- **Scannable**: Use **bolding** for values and logic results.
- **No Walls of Text**: Keep paragraphs under 4 lines."""

HUMAN_TEMPLATE = """I need an editorial for: **{problem_title}**

### 1. Problem Context
- **Description**: {problem_description}
- **Constraints**: {constraints}
- **Difficulty**: {difficulty}
- **Meta-Tags**: {metadata}

### 2. Trace Requirements
- **Target Languages**: Python, JavaScript, Java, C++, Go
- Use the first example from the problem description as the sample input for the visual trace.

### 3. Specific Focus
- Ensure you explain the "Why" behind the most difficult part of this specific algorithm."""


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
