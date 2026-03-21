from pydantic import BaseModel


class LeetCodeProblem(BaseModel):
    questionId: str
    title: str
    titleSlug: str
    difficulty: str
    question: str  # HTML content
    topicTags: list[dict] = []
    hints: list[str] = []


class TagResult(BaseModel):
    patterns: list[str]
    reasoning: str


class CodeSolutions(BaseModel):
    python: str
    javascript: str
    java: str
    cpp: str
    go: str


class Editorial(BaseModel):
    headline: str
    overview: str
    intuition: str
    visual_trace: str
    algorithm_steps: str
    code: CodeSolutions
    time_complexity: str
    space_complexity: str
    edge_cases: str


class EditorialResponse(BaseModel):
    problem: LeetCodeProblem
    patterns: list[str]
    pattern_reasoning: str
    editorial: Editorial
