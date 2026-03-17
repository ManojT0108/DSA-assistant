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


class Editorial(BaseModel):
    intuition: str
    approach: list[str]
    time_complexity: str
    space_complexity: str
    code: str


class EditorialResponse(BaseModel):
    problem: LeetCodeProblem
    patterns: list[str]
    pattern_reasoning: str
    editorial: Editorial
