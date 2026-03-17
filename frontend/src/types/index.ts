export interface LeetCodeProblem {
  questionId: string;
  title: string;
  titleSlug: string;
  difficulty: string;
  question: string;
  topicTags: { name: string; slug: string }[];
  hints: string[];
}

export interface Approach {
  name: string;
  explanation: string;
}

export interface Editorial {
  intuition: string;
  visual_walkthrough: string;
  approaches: Approach[];
  time_complexity: string;
  space_complexity: string;
  code: string;
  edge_cases: string[];
}

export interface EditorialResponse {
  problem: LeetCodeProblem;
  patterns: string[];
  pattern_reasoning: string;
  editorial: Editorial;
}
