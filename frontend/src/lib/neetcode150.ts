import { Problem } from "@/lib/blind75";

export const NEETCODE_150: Problem[] = [
  // --- Arrays & Hashing ---
  { id: 217, title: "Contains Duplicate", slug: "contains-duplicate", difficulty: "Easy", topics: ["Array", "Hash Set"], acceptance: 61 },
  { id: 242, title: "Valid Anagram", slug: "valid-anagram", difficulty: "Easy", topics: ["String", "Hash Map"], acceptance: 63 },
  { id: 1, title: "Two Sum", slug: "two-sum", difficulty: "Easy", topics: ["Array", "Hash Map"], acceptance: 53 },
  { id: 49, title: "Group Anagrams", slug: "group-anagrams", difficulty: "Medium", topics: ["Array", "Hash Map", "Sorting"], acceptance: 67 },
  { id: 347, title: "Top K Frequent Elements", slug: "top-k-frequent-elements", difficulty: "Medium", topics: ["Array", "Hash Map", "Heap"], acceptance: 65 },
  { id: 238, title: "Product of Array Except Self", slug: "product-of-array-except-self", difficulty: "Medium", topics: ["Array", "Prefix Sum"], acceptance: 65 },
  { id: 36, title: "Valid Sudoku", slug: "valid-sudoku", difficulty: "Medium", topics: ["Array", "Hash Set", "Matrix"], acceptance: 58 },
  { id: 271, title: "Encode and Decode Strings", slug: "encode-and-decode-strings", difficulty: "Medium", topics: ["Array", "String"], acceptance: 54 },
  { id: 128, title: "Longest Consecutive Sequence", slug: "longest-consecutive-sequence", difficulty: "Medium", topics: ["Array", "Hash Set"], acceptance: 47 },

  // --- Two Pointers ---
  { id: 125, title: "Valid Palindrome", slug: "valid-palindrome", difficulty: "Easy", topics: ["Two Pointers", "String"], acceptance: 46 },
  { id: 167, title: "Two Sum II - Input Array Is Sorted", slug: "two-sum-ii-input-array-is-sorted", difficulty: "Medium", topics: ["Array", "Two Pointers"], acceptance: 60 },
  { id: 15, title: "3Sum", slug: "3sum", difficulty: "Medium", topics: ["Array", "Two Pointers", "Sorting"], acceptance: 34 },
  { id: 11, title: "Container With Most Water", slug: "container-with-most-water", difficulty: "Medium", topics: ["Array", "Two Pointers", "Greedy"], acceptance: 55 },
  { id: 42, title: "Trapping Rain Water", slug: "trapping-rain-water", difficulty: "Hard", topics: ["Array", "Two Pointers", "Stack"], acceptance: 61 },

  // --- Sliding Window ---
  { id: 121, title: "Best Time to Buy and Sell Stock", slug: "best-time-to-buy-and-sell-stock", difficulty: "Easy", topics: ["Array", "Sliding Window"], acceptance: 54 },
  { id: 3, title: "Longest Substring Without Repeating Characters", slug: "longest-substring-without-repeating-characters", difficulty: "Medium", topics: ["String", "Sliding Window", "Hash Set"], acceptance: 34 },
  { id: 424, title: "Longest Repeating Character Replacement", slug: "longest-repeating-character-replacement", difficulty: "Medium", topics: ["String", "Sliding Window"], acceptance: 53 },
  { id: 567, title: "Permutation in String", slug: "permutation-in-string", difficulty: "Medium", topics: ["String", "Sliding Window", "Hash Map"], acceptance: 44 },
  { id: 76, title: "Minimum Window Substring", slug: "minimum-window-substring", difficulty: "Hard", topics: ["String", "Sliding Window", "Hash Map"], acceptance: 42 },
  { id: 239, title: "Sliding Window Maximum", slug: "sliding-window-maximum", difficulty: "Hard", topics: ["Array", "Sliding Window", "Deque"], acceptance: 46 },

  // --- Stack ---
  { id: 20, title: "Valid Parentheses", slug: "valid-parentheses", difficulty: "Easy", topics: ["String", "Stack"], acceptance: 41 },
  { id: 155, title: "Min Stack", slug: "min-stack", difficulty: "Medium", topics: ["Stack", "Design"], acceptance: 53 },
  { id: 150, title: "Evaluate Reverse Polish Notation", slug: "evaluate-reverse-polish-notation", difficulty: "Medium", topics: ["Array", "Stack", "Math"], acceptance: 47 },
  { id: 22, title: "Generate Parentheses", slug: "generate-parentheses", difficulty: "Medium", topics: ["String", "Stack", "Backtracking"], acceptance: 74 },
  { id: 739, title: "Daily Temperatures", slug: "daily-temperatures", difficulty: "Medium", topics: ["Array", "Stack", "Monotonic Stack"], acceptance: 66 },
  { id: 853, title: "Car Fleet", slug: "car-fleet", difficulty: "Medium", topics: ["Array", "Stack", "Sorting"], acceptance: 50 },
  { id: 84, title: "Largest Rectangle in Histogram", slug: "largest-rectangle-in-histogram", difficulty: "Hard", topics: ["Array", "Stack", "Monotonic Stack"], acceptance: 44 },

  // --- Binary Search ---
  { id: 704, title: "Binary Search", slug: "binary-search", difficulty: "Easy", topics: ["Array", "Binary Search"], acceptance: 55 },
  { id: 74, title: "Search a 2D Matrix", slug: "search-a-2d-matrix", difficulty: "Medium", topics: ["Array", "Binary Search", "Matrix"], acceptance: 49 },
  { id: 875, title: "Koko Eating Bananas", slug: "koko-eating-bananas", difficulty: "Medium", topics: ["Array", "Binary Search"], acceptance: 50 },
  { id: 153, title: "Find Minimum in Rotated Sorted Array", slug: "find-minimum-in-rotated-sorted-array", difficulty: "Medium", topics: ["Array", "Binary Search"], acceptance: 49 },
  { id: 33, title: "Search in Rotated Sorted Array", slug: "search-in-rotated-sorted-array", difficulty: "Medium", topics: ["Array", "Binary Search"], acceptance: 40 },
  { id: 981, title: "Time Based Key-Value Store", slug: "time-based-key-value-store", difficulty: "Medium", topics: ["Binary Search", "Hash Map", "Design"], acceptance: 49 },
  { id: 4, title: "Median of Two Sorted Arrays", slug: "median-of-two-sorted-arrays", difficulty: "Hard", topics: ["Array", "Binary Search"], acceptance: 39 },

  // --- Linked List ---
  { id: 206, title: "Reverse Linked List", slug: "reverse-linked-list", difficulty: "Easy", topics: ["Linked List"], acceptance: 76 },
  { id: 21, title: "Merge Two Sorted Lists", slug: "merge-two-sorted-lists", difficulty: "Easy", topics: ["Linked List"], acceptance: 63 },
  { id: 141, title: "Linked List Cycle", slug: "linked-list-cycle", difficulty: "Easy", topics: ["Linked List", "Two Pointers"], acceptance: 49 },
  { id: 143, title: "Reorder List", slug: "reorder-list", difficulty: "Medium", topics: ["Linked List", "Two Pointers"], acceptance: 55 },
  { id: 19, title: "Remove Nth Node From End of List", slug: "remove-nth-node-from-end-of-list", difficulty: "Medium", topics: ["Linked List", "Two Pointers"], acceptance: 43 },
  { id: 138, title: "Copy List with Random Pointer", slug: "copy-list-with-random-pointer", difficulty: "Medium", topics: ["Linked List", "Hash Map"], acceptance: 55 },
  { id: 2, title: "Add Two Numbers", slug: "add-two-numbers", difficulty: "Medium", topics: ["Linked List", "Math"], acceptance: 43 },
  { id: 287, title: "Find the Duplicate Number", slug: "find-the-duplicate-number", difficulty: "Medium", topics: ["Array", "Two Pointers", "Binary Search"], acceptance: 59 },
  { id: 146, title: "LRU Cache", slug: "lru-cache", difficulty: "Medium", topics: ["Linked List", "Hash Map", "Design"], acceptance: 42 },
  { id: 23, title: "Merge k Sorted Lists", slug: "merge-k-sorted-lists", difficulty: "Hard", topics: ["Linked List", "Heap", "Divide and Conquer"], acceptance: 52 },
  { id: 25, title: "Reverse Nodes in k-Group", slug: "reverse-nodes-in-k-group", difficulty: "Hard", topics: ["Linked List"], acceptance: 56 },

  // --- Trees ---
  { id: 226, title: "Invert Binary Tree", slug: "invert-binary-tree", difficulty: "Easy", topics: ["Tree", "DFS", "BFS"], acceptance: 77 },
  { id: 104, title: "Maximum Depth of Binary Tree", slug: "maximum-depth-of-binary-tree", difficulty: "Easy", topics: ["Tree", "DFS"], acceptance: 74 },
  { id: 543, title: "Diameter of Binary Tree", slug: "diameter-of-binary-tree", difficulty: "Easy", topics: ["Tree", "DFS"], acceptance: 58 },
  { id: 110, title: "Balanced Binary Tree", slug: "balanced-binary-tree", difficulty: "Easy", topics: ["Tree", "DFS"], acceptance: 51 },
  { id: 100, title: "Same Tree", slug: "same-tree", difficulty: "Easy", topics: ["Tree", "DFS"], acceptance: 60 },
  { id: 572, title: "Subtree of Another Tree", slug: "subtree-of-another-tree", difficulty: "Easy", topics: ["Tree", "DFS"], acceptance: 46 },
  { id: 235, title: "Lowest Common Ancestor of a BST", slug: "lowest-common-ancestor-of-a-binary-search-tree", difficulty: "Medium", topics: ["Tree", "BST", "DFS"], acceptance: 62 },
  { id: 102, title: "Binary Tree Level Order Traversal", slug: "binary-tree-level-order-traversal", difficulty: "Medium", topics: ["Tree", "BFS"], acceptance: 66 },
  { id: 199, title: "Binary Tree Right Side View", slug: "binary-tree-right-side-view", difficulty: "Medium", topics: ["Tree", "BFS", "DFS"], acceptance: 62 },
  { id: 1448, title: "Count Good Nodes in Binary Tree", slug: "count-good-nodes-in-binary-tree", difficulty: "Medium", topics: ["Tree", "DFS"], acceptance: 74 },
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
  { id: 703, title: "Kth Largest Element in a Stream", slug: "kth-largest-element-in-a-stream", difficulty: "Easy", topics: ["Heap", "Design"], acceptance: 56 },
  { id: 1046, title: "Last Stone Weight", slug: "last-stone-weight", difficulty: "Easy", topics: ["Array", "Heap"], acceptance: 65 },
  { id: 973, title: "K Closest Points to Origin", slug: "k-closest-points-to-origin", difficulty: "Medium", topics: ["Array", "Heap", "Sorting"], acceptance: 66 },
  { id: 215, title: "Kth Largest Element in an Array", slug: "kth-largest-element-in-an-array", difficulty: "Medium", topics: ["Array", "Heap", "Sorting"], acceptance: 66 },
  { id: 621, title: "Task Scheduler", slug: "task-scheduler", difficulty: "Medium", topics: ["Array", "Heap", "Greedy"], acceptance: 60 },
  { id: 355, title: "Design Twitter", slug: "design-twitter", difficulty: "Medium", topics: ["Heap", "Hash Map", "Design"], acceptance: 39 },
  { id: 295, title: "Find Median from Data Stream", slug: "find-median-from-data-stream", difficulty: "Hard", topics: ["Heap", "Design"], acceptance: 51 },

  // --- Backtracking ---
  { id: 78, title: "Subsets", slug: "subsets", difficulty: "Medium", topics: ["Array", "Backtracking"], acceptance: 76 },
  { id: 39, title: "Combination Sum", slug: "combination-sum", difficulty: "Medium", topics: ["Array", "Backtracking"], acceptance: 71 },
  { id: 46, title: "Permutations", slug: "permutations", difficulty: "Medium", topics: ["Array", "Backtracking"], acceptance: 77 },
  { id: 90, title: "Subsets II", slug: "subsets-ii", difficulty: "Medium", topics: ["Array", "Backtracking", "Sorting"], acceptance: 57 },
  { id: 40, title: "Combination Sum II", slug: "combination-sum-ii", difficulty: "Medium", topics: ["Array", "Backtracking", "Sorting"], acceptance: 54 },
  { id: 79, title: "Word Search", slug: "word-search", difficulty: "Medium", topics: ["Array", "Backtracking", "Matrix"], acceptance: 41 },
  { id: 131, title: "Palindrome Partitioning", slug: "palindrome-partitioning", difficulty: "Medium", topics: ["String", "Backtracking", "Dynamic Programming"], acceptance: 66 },
  { id: 17, title: "Letter Combinations of a Phone Number", slug: "letter-combinations-of-a-phone-number", difficulty: "Medium", topics: ["String", "Backtracking"], acceptance: 60 },
  { id: 51, title: "N-Queens", slug: "n-queens", difficulty: "Hard", topics: ["Array", "Backtracking"], acceptance: 66 },

  // --- Graphs ---
  { id: 200, title: "Number of Islands", slug: "number-of-islands", difficulty: "Medium", topics: ["Graph", "BFS", "DFS"], acceptance: 58 },
  { id: 133, title: "Clone Graph", slug: "clone-graph", difficulty: "Medium", topics: ["Graph", "BFS", "DFS"], acceptance: 53 },
  { id: 695, title: "Max Area of Island", slug: "max-area-of-island", difficulty: "Medium", topics: ["Graph", "DFS", "BFS", "Matrix"], acceptance: 72 },
  { id: 417, title: "Pacific Atlantic Water Flow", slug: "pacific-atlantic-water-flow", difficulty: "Medium", topics: ["Graph", "DFS", "BFS"], acceptance: 54 },
  { id: 130, title: "Surrounded Regions", slug: "surrounded-regions", difficulty: "Medium", topics: ["Graph", "DFS", "BFS", "Matrix"], acceptance: 38 },
  { id: 994, title: "Rotting Oranges", slug: "rotting-oranges", difficulty: "Medium", topics: ["Graph", "BFS", "Matrix"], acceptance: 53 },
  { id: 207, title: "Course Schedule", slug: "course-schedule", difficulty: "Medium", topics: ["Graph", "Topological Sort"], acceptance: 46 },
  { id: 210, title: "Course Schedule II", slug: "course-schedule-ii", difficulty: "Medium", topics: ["Graph", "Topological Sort"], acceptance: 49 },
  { id: 323, title: "Number of Connected Components in an Undirected Graph", slug: "number-of-connected-components-in-an-undirected-graph", difficulty: "Medium", topics: ["Graph", "Union Find", "BFS"], acceptance: 63 },
  { id: 684, title: "Redundant Connection", slug: "redundant-connection", difficulty: "Medium", topics: ["Graph", "Union Find"], acceptance: 63 },
  { id: 261, title: "Graph Valid Tree", slug: "graph-valid-tree", difficulty: "Medium", topics: ["Graph", "Union Find", "BFS"], acceptance: 47 },
  { id: 127, title: "Word Ladder", slug: "word-ladder", difficulty: "Hard", topics: ["Graph", "BFS", "String"], acceptance: 39 },

  // --- Advanced Graphs ---
  { id: 1584, title: "Min Cost to Connect All Points", slug: "min-cost-to-connect-all-points", difficulty: "Medium", topics: ["Graph", "MST"], acceptance: 65 },
  { id: 743, title: "Network Delay Time", slug: "network-delay-time", difficulty: "Medium", topics: ["Graph", "Dijkstra"], acceptance: 53 },
  { id: 778, title: "Swim in Rising Water", slug: "swim-in-rising-water", difficulty: "Hard", topics: ["Graph", "Binary Search", "Heap"], acceptance: 60 },
  { id: 269, title: "Alien Dictionary", slug: "alien-dictionary", difficulty: "Hard", topics: ["Graph", "Topological Sort"], acceptance: 35 },
  { id: 332, title: "Reconstruct Itinerary", slug: "reconstruct-itinerary", difficulty: "Hard", topics: ["Graph", "DFS", "Sorting"], acceptance: 42 },

  // --- 1-D Dynamic Programming ---
  { id: 70, title: "Climbing Stairs", slug: "climbing-stairs", difficulty: "Easy", topics: ["Dynamic Programming"], acceptance: 52 },
  { id: 746, title: "Min Cost Climbing Stairs", slug: "min-cost-climbing-stairs", difficulty: "Easy", topics: ["Array", "Dynamic Programming"], acceptance: 65 },
  { id: 198, title: "House Robber", slug: "house-robber", difficulty: "Medium", topics: ["Array", "Dynamic Programming"], acceptance: 50 },
  { id: 213, title: "House Robber II", slug: "house-robber-ii", difficulty: "Medium", topics: ["Array", "Dynamic Programming"], acceptance: 42 },
  { id: 5, title: "Longest Palindromic Substring", slug: "longest-palindromic-substring", difficulty: "Medium", topics: ["String", "Dynamic Programming"], acceptance: 33 },
  { id: 647, title: "Palindromic Substrings", slug: "palindromic-substrings", difficulty: "Medium", topics: ["String", "Dynamic Programming"], acceptance: 68 },
  { id: 91, title: "Decode Ways", slug: "decode-ways", difficulty: "Medium", topics: ["String", "Dynamic Programming"], acceptance: 34 },
  { id: 322, title: "Coin Change", slug: "coin-change", difficulty: "Medium", topics: ["Array", "Dynamic Programming"], acceptance: 43 },
  { id: 152, title: "Maximum Product Subarray", slug: "maximum-product-subarray", difficulty: "Medium", topics: ["Array", "Dynamic Programming"], acceptance: 35 },
  { id: 139, title: "Word Break", slug: "word-break", difficulty: "Medium", topics: ["String", "Dynamic Programming", "Trie"], acceptance: 46 },
  { id: 300, title: "Longest Increasing Subsequence", slug: "longest-increasing-subsequence", difficulty: "Medium", topics: ["Array", "Dynamic Programming", "Binary Search"], acceptance: 54 },
  { id: 416, title: "Partition Equal Subset Sum", slug: "partition-equal-subset-sum", difficulty: "Medium", topics: ["Array", "Dynamic Programming"], acceptance: 47 },

  // --- 2-D Dynamic Programming ---
  { id: 62, title: "Unique Paths", slug: "unique-paths", difficulty: "Medium", topics: ["Dynamic Programming", "Math"], acceptance: 64 },
  { id: 1143, title: "Longest Common Subsequence", slug: "longest-common-subsequence", difficulty: "Medium", topics: ["String", "Dynamic Programming"], acceptance: 58 },
  { id: 518, title: "Coin Change II", slug: "coin-change-ii", difficulty: "Medium", topics: ["Array", "Dynamic Programming"], acceptance: 63 },
  { id: 494, title: "Target Sum", slug: "target-sum", difficulty: "Medium", topics: ["Array", "Dynamic Programming", "Backtracking"], acceptance: 45 },
  { id: 97, title: "Interleaving String", slug: "interleaving-string", difficulty: "Medium", topics: ["String", "Dynamic Programming"], acceptance: 39 },
  { id: 329, title: "Longest Increasing Path in a Matrix", slug: "longest-increasing-path-in-a-matrix", difficulty: "Hard", topics: ["Dynamic Programming", "DFS", "Matrix"], acceptance: 53 },
  { id: 115, title: "Distinct Subsequences", slug: "distinct-subsequences", difficulty: "Hard", topics: ["String", "Dynamic Programming"], acceptance: 45 },
  { id: 72, title: "Edit Distance", slug: "edit-distance", difficulty: "Medium", topics: ["String", "Dynamic Programming"], acceptance: 55 },
  { id: 312, title: "Burst Balloons", slug: "burst-balloons", difficulty: "Hard", topics: ["Array", "Dynamic Programming"], acceptance: 58 },
  { id: 10, title: "Regular Expression Matching", slug: "regular-expression-matching", difficulty: "Hard", topics: ["String", "Dynamic Programming"], acceptance: 28 },

  // --- Greedy ---
  { id: 53, title: "Maximum Subarray", slug: "maximum-subarray", difficulty: "Medium", topics: ["Array", "Dynamic Programming", "Greedy"], acceptance: 50 },
  { id: 55, title: "Jump Game", slug: "jump-game", difficulty: "Medium", topics: ["Array", "Greedy"], acceptance: 38 },
  { id: 45, title: "Jump Game II", slug: "jump-game-ii", difficulty: "Medium", topics: ["Array", "Greedy"], acceptance: 40 },
  { id: 134, title: "Gas Station", slug: "gas-station", difficulty: "Medium", topics: ["Array", "Greedy"], acceptance: 45 },
  { id: 846, title: "Hand of Straights", slug: "hand-of-straights", difficulty: "Medium", topics: ["Array", "Greedy", "Sorting"], acceptance: 56 },
  { id: 1899, title: "Merge Triplets to Form Target Triplet", slug: "merge-triplets-to-form-target-triplet", difficulty: "Medium", topics: ["Array", "Greedy"], acceptance: 64 },
  { id: 763, title: "Partition Labels", slug: "partition-labels", difficulty: "Medium", topics: ["String", "Greedy", "Hash Map"], acceptance: 79 },
  { id: 678, title: "Valid Parenthesis String", slug: "valid-parenthesis-string", difficulty: "Medium", topics: ["String", "Greedy", "Stack"], acceptance: 34 },

  // --- Intervals ---
  { id: 57, title: "Insert Interval", slug: "insert-interval", difficulty: "Medium", topics: ["Array", "Intervals"], acceptance: 40 },
  { id: 56, title: "Merge Intervals", slug: "merge-intervals", difficulty: "Medium", topics: ["Array", "Intervals", "Sorting"], acceptance: 47 },
  { id: 435, title: "Non-overlapping Intervals", slug: "non-overlapping-intervals", difficulty: "Medium", topics: ["Array", "Intervals", "Greedy"], acceptance: 52 },
  { id: 252, title: "Meeting Rooms", slug: "meeting-rooms", difficulty: "Easy", topics: ["Array", "Intervals", "Sorting"], acceptance: 57 },
  { id: 253, title: "Meeting Rooms II", slug: "meeting-rooms-ii", difficulty: "Medium", topics: ["Array", "Intervals", "Heap"], acceptance: 51 },
  { id: 1851, title: "Minimum Interval to Include Each Query", slug: "minimum-interval-to-include-each-query", difficulty: "Hard", topics: ["Array", "Intervals", "Sorting", "Heap"], acceptance: 50 },

  // --- Math & Geometry ---
  { id: 48, title: "Rotate Image", slug: "rotate-image", difficulty: "Medium", topics: ["Array", "Math", "Matrix"], acceptance: 73 },
  { id: 54, title: "Spiral Matrix", slug: "spiral-matrix", difficulty: "Medium", topics: ["Array", "Matrix", "Simulation"], acceptance: 48 },
  { id: 73, title: "Set Matrix Zeroes", slug: "set-matrix-zeroes", difficulty: "Medium", topics: ["Array", "Matrix"], acceptance: 54 },
  { id: 202, title: "Happy Number", slug: "happy-number", difficulty: "Easy", topics: ["Math", "Hash Set"], acceptance: 55 },
  { id: 66, title: "Plus One", slug: "plus-one", difficulty: "Easy", topics: ["Array", "Math"], acceptance: 44 },
  { id: 50, title: "Pow(x, n)", slug: "powx-n", difficulty: "Medium", topics: ["Math"], acceptance: 34 },
  { id: 43, title: "Multiply Strings", slug: "multiply-strings", difficulty: "Medium", topics: ["String", "Math"], acceptance: 40 },
  { id: 2013, title: "Detect Squares", slug: "detect-squares", difficulty: "Medium", topics: ["Array", "Math", "Hash Map", "Design"], acceptance: 53 },

  // --- Bit Manipulation ---
  { id: 136, title: "Single Number", slug: "single-number", difficulty: "Easy", topics: ["Array", "Bit Manipulation"], acceptance: 72 },
  { id: 191, title: "Number of 1 Bits", slug: "number-of-1-bits", difficulty: "Easy", topics: ["Bit Manipulation"], acceptance: 67 },
  { id: 338, title: "Counting Bits", slug: "counting-bits", difficulty: "Easy", topics: ["Dynamic Programming", "Bit Manipulation"], acceptance: 78 },
  { id: 190, title: "Reverse Bits", slug: "reverse-bits", difficulty: "Easy", topics: ["Bit Manipulation"], acceptance: 56 },
  { id: 268, title: "Missing Number", slug: "missing-number", difficulty: "Easy", topics: ["Array", "Bit Manipulation", "Math"], acceptance: 65 },
  { id: 371, title: "Sum of Two Integers", slug: "sum-of-two-integers", difficulty: "Medium", topics: ["Bit Manipulation", "Math"], acceptance: 51 },
  { id: 7, title: "Reverse Integer", slug: "reverse-integer", difficulty: "Medium", topics: ["Math"], acceptance: 28 },
];
