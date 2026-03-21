export interface LeetCodeProblem {
  questionId: string;
  title: string;
  titleSlug: string;
  difficulty: string;
  question: string;
  topicTags: { name: string; slug: string }[];
  hints: string[];
}

export interface CodeSolutions {
  python: string;
  javascript: string;
  java: string;
  cpp: string;
  go: string;
}

export interface Editorial {
  headline: string;
  overview: string;
  intuition: string;
  visual_trace: string;
  algorithm_steps: string;
  code: CodeSolutions;
  time_complexity: string;
  space_complexity: string;
  edge_cases: string;
}

export interface EditorialResponse {
  problem: LeetCodeProblem;
  patterns: string[];
  pattern_reasoning: string;
  editorial: Editorial;
}
