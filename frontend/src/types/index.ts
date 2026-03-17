export interface LeetCodeProblem {
  questionId: string;
  title: string;
  titleSlug: string;
  difficulty: string;
  question: string;
  topicTags: { name: string; slug: string }[];
  hints: string[];
}

export interface Editorial {
  intuition: string;
  approach: string[];
  time_complexity: string;
  space_complexity: string;
  code: string;
}

export interface EditorialResponse {
  problem: LeetCodeProblem;
  patterns: string[];
  pattern_reasoning: string;
  editorial: Editorial;
}
