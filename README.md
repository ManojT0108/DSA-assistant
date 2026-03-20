# Find My Editorial

A free, developer-centric AI LeetCode Editorial Engine that generates pattern-based interview prep content. Full-stack app with a FastAPI + LangChain backend and a Next.js + Tailwind frontend.

## Features

- **AI-Powered Editorials** — Generates detailed editorials for any LeetCode problem using Google Gemini, including intuition, visual walkthroughs, multiple approaches, complexity analysis, and edge cases.
- **Multi-Language Solutions** — Code solutions in Python, JavaScript, Java, C++, and Go, displayed in a tabbed interface.
- **DSA Pattern Tagging** — Automatically identifies algorithmic patterns (Two Pointers, Sliding Window, DP, etc.) for each problem.
- **Blind 75 Problem List** — Homepage features the full Blind 75 list organized by difficulty (Easy, Medium, Hard) with collapsible sections.
- **Daily Challenge** — One-click access to today's LeetCode daily challenge editorial.
- **Personal Notes** — Add notes/remarks to any problem, saved locally via cookies.
- **In-Memory Caching** — Previously generated editorials are cached to avoid redundant LLM calls.

## Tech Stack

| Layer | Tech |
|---|---|
| Backend | Python, FastAPI, LangChain, Google Gemini |
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| LeetCode Data | [alfa-leetcode-api](https://github.com/alfaarghya/alfa-leetcode-api) |
| Code Highlighting | react-syntax-highlighter |
| Markdown Rendering | react-markdown, remark-gfm, remark-math, rehype-katex |

## Project Structure

```
find-my-editorial/
├── backend/
│   ├── pyproject.toml
│   ├── .env.example
│   └── app/
│       ├── main.py              # FastAPI app, CORS, health check
│       ├── config.py            # Pydantic settings (env vars)
│       ├── models.py            # Pydantic models
│       ├── cache.py             # In-memory dict cache
│       ├── services/
│       │   ├── leetcode.py      # Async client → alfa-leetcode-api
│       │   └── editorial.py     # LangChain two-step chain (tagger + editorialist)
│       └── routes/
│           ├── daily.py         # GET /daily
│           └── solve.py         # POST /solve/{slug}
└── frontend/
    └── src/
        ├── app/
        │   ├── page.tsx                   # Home — search, daily challenge, Blind 75
        │   └── editorial/[slug]/page.tsx  # Split-pane editorial view
        ├── components/
        │   ├── SearchBar.tsx
        │   ├── ProblemTable.tsx    # Blind 75 table with collapsible sections & notes
        │   ├── ProblemPane.tsx     # Left pane: original problem
        │   ├── EditorialPane.tsx   # Right pane: AI editorial
        │   ├── CodeTabs.tsx        # Multi-language tabbed code viewer
        │   ├── Markdown.tsx        # Markdown renderer with syntax highlighting
        │   ├── PatternPills.tsx    # DSA pattern tags
        │   └── LoadingSkeleton.tsx # Animated loading state
        ├── lib/
        │   ├── api.ts             # Backend fetch helpers
        │   ├── utils.ts           # Slug extraction
        │   ├── blind75.ts         # Blind 75 problem data
        │   └── notes.ts           # Cookie-based notes storage
        └── types/index.ts         # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"

cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY

uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/daily` | Generate editorial for today's daily challenge |
| `POST` | `/solve/{slug}` | Generate editorial for a problem by slug |

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `GOOGLE_API_KEY` | `backend/.env` | Google Gemini API key |
| `GEMINI_MODEL` | `backend/.env` | Model name (default: `gemini-1.5-flash`) |
| `LEETCODE_API_BASE` | `backend/.env` | LeetCode API base URL |
| `CORS_ORIGINS` | `backend/.env` | Allowed CORS origins |
| `NEXT_PUBLIC_API_URL` | `frontend/.env.local` | Backend URL (default: `http://localhost:8000`) |

## License

MIT
