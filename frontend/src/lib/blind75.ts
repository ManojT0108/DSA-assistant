export interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  acceptance: number; // percentage
}

export const BLIND_75: Problem[] = [
  // --- Arrays & Hashing ---
  { id: 1, title: "Two Sum", slug: "two-sum", difficulty: "Easy", topics: ["Array", "Hash Map"], acceptance: 53 },
  { id: 49, title: "Group Anagrams", slug: "group-anagrams", difficulty: "Medium", topics: ["Array", "Hash Map", "Sorting"], acceptance: 67 },
  { id: 217, title: "Contains Duplicate", slug: "contains-duplicate", difficulty: "Easy", topics: ["Array", "Hash Set"], acceptance: 61 },
  { id: 238, title: "Product of Array Except Self", slug: "product-of-array-except-self", difficulty: "Medium", topics: ["Array", "Prefix Sum"], acceptance: 65 },
  { id: 347, title: "Top K Frequent Elements", slug: "top-k-frequent-elements", difficulty: "Medium", topics: ["Array", "Hash Map", "Heap"], acceptance: 65 },
  { id: 271, title: "Encode and Decode Strings", slug: "encode-and-decode-strings", difficulty: "Medium", topics: ["Array", "String"], acceptance: 54 },
  { id: 128, title: "Longest Consecutive Sequence", slug: "longest-consecutive-sequence", difficulty: "Medium", topics: ["Array", "Hash Set"], acceptance: 47 },
  { id: 242, title: "Valid Anagram", slug: "valid-anagram", difficulty: "Easy", topics: ["String", "Hash Map"], acceptance: 63 },

  // --- Two Pointers ---
  { id: 125, title: "Valid Palindrome", slug: "valid-palindrome", difficulty: "Easy", topics: ["Two Pointers", "String"], acceptance: 46 },
  { id: 15, title: "3Sum", slug: "3sum", difficulty: "Medium", topics: ["Array", "Two Pointers", "Sorting"], acceptance: 34 },
  { id: 11, title: "Container With Most Water", slug: "container-with-most-water", difficulty: "Medium", topics: ["Array", "Two Pointers", "Greedy"], acceptance: 55 },

  // --- Sliding Window ---
  { id: 121, title: "Best Time to Buy and Sell Stock", slug: "best-time-to-buy-and-sell-stock", difficulty: "Easy", topics: ["Array", "Sliding Window"], acceptance: 54 },
  { id: 3, title: "Longest Substring Without Repeating Characters", slug: "longest-substring-without-repeating-characters", difficulty: "Medium", topics: ["String", "Sliding Window", "Hash Set"], acceptance: 34 },
  { id: 424, title: "Longest Repeating Character Replacement", slug: "longest-repeating-character-replacement", difficulty: "Medium", topics: ["String", "Sliding Window"], acceptance: 53 },
  { id: 76, title: "Minimum Window Substring", slug: "minimum-window-substring", difficulty: "Hard", topics: ["String", "Sliding Window", "Hash Map"], acceptance: 42 },

  // --- Stack ---
  { id: 20, title: "Valid Parentheses", slug: "valid-parentheses", difficulty: "Easy", topics: ["String", "Stack"], acceptance: 41 },

  // --- Binary Search ---
  { id: 153, title: "Find Minimum in Rotated Sorted Array", slug: "find-minimum-in-rotated-sorted-array", difficulty: "Medium", topics: ["Array", "Binary Search"], acceptance: 49 },
  { id: 33, title: "Search in Rotated Sorted Array", slug: "search-in-rotated-sorted-array", difficulty: "Medium", topics: ["Array", "Binary Search"], acceptance: 40 },

  // --- Linked List ---
  { id: 206, title: "Reverse Linked List", slug: "reverse-linked-list", difficulty: "Easy", topics: ["Linked List"], acceptance: 76 },
  { id: 21, title: "Merge Two Sorted Lists", slug: "merge-two-sorted-lists", difficulty: "Easy", topics: ["Linked List"], acceptance: 63 },
  { id: 141, title: "Linked List Cycle", slug: "linked-list-cycle", difficulty: "Easy", topics: ["Linked List", "Two Pointers"], acceptance: 49 },
  { id: 143, title: "Reorder List", slug: "reorder-list", difficulty: "Medium", topics: ["Linked List", "Two Pointers"], acceptance: 55 },
  { id: 19, title: "Remove Nth Node From End of List", slug: "remove-nth-node-from-end-of-list", difficulty: "Medium", topics: ["Linked List", "Two Pointers"], acceptance: 43 },
  { id: 23, title: "Merge k Sorted Lists", slug: "merge-k-sorted-lists", difficulty: "Hard", topics: ["Linked List", "Heap", "Divide and Conquer"], acceptance: 52 },

  // --- Trees ---
  { id: 226, title: "Invert Binary Tree", slug: "invert-binary-tree", difficulty: "Easy", topics: ["Tree", "DFS", "BFS"], acceptance: 77 },
  { id: 104, title: "Maximum Depth of Binary Tree", slug: "maximum-depth-of-binary-tree", difficulty: "Easy", topics: ["Tree", "DFS"], acceptance: 74 },
  { id: 100, title: "Same Tree", slug: "same-tree", difficulty: "Easy", topics: ["Tree", "DFS"], acceptance: 60 },
  { id: 572, title: "Subtree of Another Tree", slug: "subtree-of-another-tree", difficulty: "Easy", topics: ["Tree", "DFS"], acceptance: 46 },
  { id: 235, title: "Lowest Common Ancestor of a BST", slug: "lowest-common-ancestor-of-a-binary-search-tree", difficulty: "Medium", topics: ["Tree", "BST", "DFS"], acceptance: 62 },
  { id: 102, title: "Binary Tree Level Order Traversal", slug: "binary-tree-level-order-traversal", difficulty: "Medium", topics: ["Tree", "BFS"], acceptance: 66 },
  { id: 98, title: "Validate Binary Search Tree", slug: "validate-binary-search-tree", difficulty: "Medium", topics: ["Tree", "BST", "DFS"], acceptance: 32 },
  { id: 230, title: "Kth Smallest Element in a BST", slug: "kth-smallest-element-in-a-bst", difficulty: "Medium", topics: ["Tree", "BST", "DFS"], acceptance: 72 },
  { id: 105, title: "Construct Binary Tree from Preorder and Inorder Traversal", slug: "construct-binary-tree-from-preorder-and-inorder-traversal", difficulty: "Medium", topics: ["Tree", "DFS", "Divide and Conquer"], acceptance: 64 },
  { id: 124, title: "Binary Tree Maximum Path Sum", slug: "binary-tree-maximum-path-sum", difficulty: "Hard", topics: ["Tree", "DFS", "Dynamic Programming"], acceptance: 39 },
  { id: 297, title: "Serialize and Deserialize Binary Tree", slug: "serialize-and-deserialize-binary-tree", difficulty: "Hard", topics: ["Tree", "DFS", "BFS", "Design"], acceptance: 56 },

  // --- Tries ---
  { id: 208, title: "Implement Trie (Prefix Tree)", slug: "implement-trie-prefix-tree", difficulty: "Medium", topics: ["Trie", "Design"], acceptance: 65 },
  { id: 211, title: "Design Add and Search Words Data Structure", slug: "design-add-and-search-words-data-structure", difficulty: "Medium", topics: ["Trie", "DFS", "Design"], acceptance: 44 },
  { id: 212, title: "Word Search II", slug: "word-search-ii", difficulty: "Hard", topics: ["Trie", "Backtracking"], acceptance: 36 },

  // --- Heap / Priority Queue ---
  { id: 295, title: "Find Median from Data Stream", slug: "find-median-from-data-stream", difficulty: "Hard", topics: ["Heap", "Design"], acceptance: 51 },

  // --- Backtracking ---
  { id: 39, title: "Combination Sum", slug: "combination-sum", difficulty: "Medium", topics: ["Array", "Backtracking"], acceptance: 71 },
  { id: 79, title: "Word Search", slug: "word-search", difficulty: "Medium", topics: ["Array", "Backtracking"], acceptance: 41 },

  // --- Graphs ---
  { id: 200, title: "Number of Islands", slug: "number-of-islands", difficulty: "Medium", topics: ["Graph", "BFS", "DFS"], acceptance: 58 },
  { id: 133, title: "Clone Graph", slug: "clone-graph", difficulty: "Medium", topics: ["Graph", "BFS", "DFS"], acceptance: 53 },
  { id: 417, title: "Pacific Atlantic Water Flow", slug: "pacific-atlantic-water-flow", difficulty: "Medium", topics: ["Graph", "DFS", "BFS"], acceptance: 54 },
  { id: 207, title: "Course Schedule", slug: "course-schedule", difficulty: "Medium", topics: ["Graph", "Topological Sort"], acceptance: 46 },
  { id: 323, title: "Number of Connected Components in an Undirected Graph", slug: "number-of-connected-components-in-an-undirected-graph", difficulty: "Medium", topics: ["Graph", "Union Find", "BFS"], acceptance: 63 },
  { id: 261, title: "Graph Valid Tree", slug: "graph-valid-tree", difficulty: "Medium", topics: ["Graph", "Union Find", "BFS"], acceptance: 47 },

  // --- 1-D Dynamic Programming ---
  { id: 70, title: "Climbing Stairs", slug: "climbing-stairs", difficulty: "Easy", topics: ["Dynamic Programming"], acceptance: 52 },
  { id: 198, title: "House Robber", slug: "house-robber", difficulty: "Medium", topics: ["Array", "Dynamic Programming"], acceptance: 50 },
  { id: 213, title: "House Robber II", slug: "house-robber-ii", difficulty: "Medium", topics: ["Array", "Dynamic Programming"], acceptance: 42 },
  { id: 5, title: "Longest Palindromic Substring", slug: "longest-palindromic-substring", difficulty: "Medium", topics: ["String", "Dynamic Programming"], acceptance: 33 },
  { id: 647, title: "Palindromic Substrings", slug: "palindromic-substrings", difficulty: "Medium", topics: ["String", "Dynamic Programming"], acceptance: 68 },
  { id: 91, title: "Decode Ways", slug: "decode-ways", difficulty: "Medium", topics: ["String", "Dynamic Programming"], acceptance: 34 },
  { id: 322, title: "Coin Change", slug: "coin-change", difficulty: "Medium", topics: ["Array", "Dynamic Programming"], acceptance: 43 },
  { id: 152, title: "Maximum Product Subarray", slug: "maximum-product-subarray", difficulty: "Medium", topics: ["Array", "Dynamic Programming"], acceptance: 35 },
  { id: 139, title: "Word Break", slug: "word-break", difficulty: "Medium", topics: ["String", "Dynamic Programming", "Trie"], acceptance: 46 },
  { id: 300, title: "Longest Increasing Subsequence", slug: "longest-increasing-subsequence", difficulty: "Medium", topics: ["Array", "Dynamic Programming", "Binary Search"], acceptance: 54 },

  // --- 2-D Dynamic Programming ---
  { id: 62, title: "Unique Paths", slug: "unique-paths", difficulty: "Medium", topics: ["Dynamic Programming", "Math"], acceptance: 64 },
  { id: 1143, title: "Longest Common Subsequence", slug: "longest-common-subsequence", difficulty: "Medium", topics: ["String", "Dynamic Programming"], acceptance: 58 },

  // --- Greedy ---
  { id: 53, title: "Maximum Subarray", slug: "maximum-subarray", difficulty: "Medium", topics: ["Array", "Dynamic Programming", "Greedy"], acceptance: 50 },
  { id: 55, title: "Jump Game", slug: "jump-game", difficulty: "Medium", topics: ["Array", "Greedy"], acceptance: 38 },

  // --- Intervals ---
  { id: 57, title: "Insert Interval", slug: "insert-interval", difficulty: "Medium", topics: ["Array", "Intervals"], acceptance: 40 },
  { id: 56, title: "Merge Intervals", slug: "merge-intervals", difficulty: "Medium", topics: ["Array", "Intervals", "Sorting"], acceptance: 47 },
  { id: 435, title: "Non-overlapping Intervals", slug: "non-overlapping-intervals", difficulty: "Medium", topics: ["Array", "Intervals", "Greedy"], acceptance: 52 },
  { id: 252, title: "Meeting Rooms", slug: "meeting-rooms", difficulty: "Easy", topics: ["Array", "Intervals", "Sorting"], acceptance: 57 },
  { id: 253, title: "Meeting Rooms II", slug: "meeting-rooms-ii", difficulty: "Medium", topics: ["Array", "Intervals", "Heap"], acceptance: 51 },

  // --- Bit Manipulation ---
  { id: 191, title: "Number of 1 Bits", slug: "number-of-1-bits", difficulty: "Easy", topics: ["Bit Manipulation"], acceptance: 67 },
  { id: 338, title: "Counting Bits", slug: "counting-bits", difficulty: "Easy", topics: ["Dynamic Programming", "Bit Manipulation"], acceptance: 78 },
  { id: 268, title: "Missing Number", slug: "missing-number", difficulty: "Easy", topics: ["Array", "Bit Manipulation", "Math"], acceptance: 65 },
  { id: 190, title: "Reverse Bits", slug: "reverse-bits", difficulty: "Easy", topics: ["Bit Manipulation"], acceptance: 56 },

  // --- Math & Geometry ---
  { id: 48, title: "Rotate Image", slug: "rotate-image", difficulty: "Medium", topics: ["Array", "Math", "Matrix"], acceptance: 73 },
  { id: 54, title: "Spiral Matrix", slug: "spiral-matrix", difficulty: "Medium", topics: ["Array", "Matrix", "Simulation"], acceptance: 48 },
  { id: 73, title: "Set Matrix Zeroes", slug: "set-matrix-zeroes", difficulty: "Medium", topics: ["Array", "Matrix"], acceptance: 54 },
];
