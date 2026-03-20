// Deterministic color for each topic category
const TOPIC_STYLES: Record<string, string> = {
  "Array":               "bg-blue-500/12 text-blue-400 border-blue-500/20",
  "String":              "bg-violet-500/12 text-violet-400 border-violet-500/20",
  "Hash Map":            "bg-amber-500/12 text-amber-400 border-amber-500/20",
  "Hash Set":            "bg-amber-500/12 text-amber-400 border-amber-500/20",
  "Two Pointers":        "bg-cyan-500/12 text-cyan-400 border-cyan-500/20",
  "Sliding Window":      "bg-teal-500/12 text-teal-400 border-teal-500/20",
  "Binary Search":       "bg-orange-500/12 text-orange-400 border-orange-500/20",
  "Prefix Sum":          "bg-lime-500/12 text-lime-400 border-lime-500/20",
  "Stack":               "bg-rose-500/12 text-rose-400 border-rose-500/20",
  "Linked List":         "bg-pink-500/12 text-pink-400 border-pink-500/20",
  "Tree":                "bg-emerald-500/12 text-emerald-400 border-emerald-500/20",
  "DFS":                 "bg-green-500/12 text-green-400 border-green-500/20",
  "BFS":                 "bg-sky-500/12 text-sky-400 border-sky-500/20",
  "BST":                 "bg-emerald-500/12 text-emerald-300 border-emerald-500/20",
  "Trie":                "bg-fuchsia-500/12 text-fuchsia-400 border-fuchsia-500/20",
  "Heap":                "bg-red-500/12 text-red-400 border-red-500/20",
  "Graph":               "bg-indigo-500/12 text-indigo-400 border-indigo-500/20",
  "Topological Sort":    "bg-indigo-500/12 text-indigo-300 border-indigo-500/20",
  "Union Find":          "bg-purple-500/12 text-purple-400 border-purple-500/20",
  "Backtracking":        "bg-yellow-500/12 text-yellow-400 border-yellow-500/20",
  "Dynamic Programming": "bg-cyan-600/12 text-cyan-300 border-cyan-600/20",
  "Greedy":              "bg-lime-600/12 text-lime-300 border-lime-600/20",
  "Intervals":           "bg-orange-600/12 text-orange-300 border-orange-600/20",
  "Bit Manipulation":    "bg-slate-500/12 text-slate-400 border-slate-500/20",
  "Math":                "bg-zinc-500/12 text-zinc-400 border-zinc-500/20",
  "Matrix":              "bg-blue-600/12 text-blue-300 border-blue-600/20",
  "Simulation":          "bg-stone-500/12 text-stone-400 border-stone-500/20",
  "Design":              "bg-fuchsia-600/12 text-fuchsia-300 border-fuchsia-600/20",
  "Divide and Conquer":  "bg-violet-600/12 text-violet-300 border-violet-600/20",
  "Sorting":             "bg-amber-600/12 text-amber-300 border-amber-600/20",
};

const FALLBACK = "bg-gray-500/12 text-gray-400 border-gray-500/20";

export function getTopicStyle(topic: string): string {
  return TOPIC_STYLES[topic] || FALLBACK;
}
