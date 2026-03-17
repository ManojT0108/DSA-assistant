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


class Approach(BaseModel):
    name: str
    explanation: str


class Editorial(BaseModel):
    intuition: str
    visual_walkthrough: str
    approaches: list[Approach]
    time_complexity: str
    space_complexity: str
    code: str
    edge_cases: list[str]


class EditorialResponse(BaseModel):
    problem: LeetCodeProblem
    patterns: list[str]
    pattern_reasoning: str
    editorial: Editorial
