# Find My Editorial

A free, developer-centric AI LeetCode Editorial Engine that generates pattern-based interview prep content. Bypasses paywalled solutions with AI-generated editorials featuring visual execution traces, brute-force-to-optimal breakdowns, and multi-language implementations.

## Features

- **AI-Powered Editorials** — Generates detailed editorials using Google Gemini with a "Visual Logic Tracing" approach: brute force analysis, mental model analogies, ASCII execution traces, implementation deep dives, and complexity analysis.
- **Multi-Language Solutions** — Clean, annotated code in Python, JavaScript, Java, C++, and Go, displayed in a tabbed interface with custom syntax highlighting.
- **DSA Pattern Tagging** — Automatically classifies problems into algorithmic patterns (Two Pointers, Sliding Window, DP, Backtracking, etc.) before generating the editorial.
- **Blind 75 & NeetCode 150** — Homepage features both curated problem lists with a dropdown selector, organized by difficulty with collapsible sections.
- **Daily Challenge** — One-click access to today's LeetCode daily challenge editorial.
- **In-Memory Caching** — Previously generated editorials are cached to avoid redundant LLM calls.

## Tech Stack

| Layer | Tech |
|---|---|
| Backend | Python, FastAPI, LangChain, Google Gemini |
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| LeetCode Data | LeetCode GraphQL API (direct) |
| Code Highlighting | react-syntax-highlighter |
| Markdown Rendering | react-markdown, remark-gfm, remark-math, rehype-katex |
| Deployment | Docker (multi-stage), Render |

## Project Structure

```
find-my-editorial/
├── Dockerfile              # Multi-stage: builds frontend + backend into one image
├── render.yaml             # Render deployment config
├── backend/
│   ├── pyproject.toml
│   ├── .env.example
│   └── app/
│       ├── main.py                 # FastAPI app, CORS, health check
│       ├── config.py               # Pydantic settings
│       ├── models.py               # Pydantic models (Editorial, CodeSolutions, etc.)
│       ├── cache.py                # In-memory dict cache
│       ├── services/
│       │   ├── leetcode.py         # LeetCode GraphQL client (with retry/backoff)
│       │   └── editorial.py        # LangChain two-step chain (tagger → editorialist)
│       └── routes/
│           ├── daily.py            # GET /daily
│           └── solve.py            # POST /solve/{slug} (with rate-limit detection)
└── frontend/
    ├── next.config.ts              # Standalone output + /api/* rewrite to backend
    └── src/
        ├── app/
        │   ├── page.tsx                    # Home — search, daily, Blind 75 / NeetCode 150
        │   ├── globals.css                 # Dark/light theme CSS variables
        │   └── editorial/[slug]/page.tsx   # Split-pane editorial view
        ├── components/
        │   ├── SearchBar.tsx               # Search by slug or LeetCode URL
        │   ├── ProblemTable.tsx            # Collapsible table with checkboxes & progress
        │   ├── ProblemPane.tsx             # Left pane: original problem (sanitized HTML)
        │   ├── EditorialPane.tsx           # Right pane: AI editorial sections
        │   ├── CodeTabs.tsx                # Multi-language tabbed code viewer
        │   ├── Markdown.tsx                # Markdown renderer with syntax highlighting
        │   ├── PatternPills.tsx            # Colored DSA pattern tags
        │   ├── LoadingSkeleton.tsx         # Animated loading state with progress ring
        │   └── ThemeToggle.tsx             # Dark/light theme switcher
        ├── lib/
        │   ├── api.ts                      # Backend fetch helpers + RateLimitError
        │   ├── utils.ts                    # Slug extraction from URLs
        │   ├── blind75.ts                  # Blind 75 problem data
        │   ├── neetcode150.ts              # NeetCode 150 problem data
        │   ├── notes.ts                    # Cookie-based completion tracking
        │   └── topicColors.ts              # Deterministic topic color mapping
        └── types/index.ts                  # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### Local Development

Run the backend and frontend separately:

```bash
# Terminal 1 — Backend
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env   # Add your GOOGLE_API_KEY
uvicorn app.main:app --reload --port 8000

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker (Local)

Run the entire app in a single container:

```bash
docker build -t find-my-editorial .
docker run -p 3000:3000 \
  -e GOOGLE_API_KEY=your-key-here \
  -e GEMINI_MODEL=gemini-2.5-flash-lite \
  find-my-editorial
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment (Render)

The project ships with a `Dockerfile` and `render.yaml` for one-click deployment to [Render](https://render.com):

1. Push the repo to GitHub.
2. Go to [render.com](https://render.com) → **New** → **Web Service**.
3. Connect your GitHub repo — Render auto-detects the `render.yaml`.
4. Add the `GOOGLE_API_KEY` environment variable.
5. Click **Deploy**.

The Docker image bundles both services into a single container:
- **Next.js** serves the UI on port 3000 and proxies `/api/*` requests internally.
- **FastAPI** runs on port 8000 (internal only) and handles all API logic.
- **Supervisor** manages both processes.

> **Note**: Render's free tier spins down after 15 minutes of inactivity. The first request after idle takes ~30s to cold-start. After that, responses are instant (except LLM generation which takes 10-15s).

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/daily` | Generate editorial for today's daily challenge |
| `POST` | `/solve/{slug}` | Generate editorial for a problem by slug |

All endpoints return structured JSON. Rate-limited requests return a `429` with retry timing and actionable suggestions.

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `GOOGLE_API_KEY` | `backend/.env` / Render env | Google Gemini API key |
| `GEMINI_MODEL` | `backend/.env` / Render env | Gemini model name (default: `gemini-2.5-flash-lite`) |
| `CORS_ORIGINS` | `backend/.env` / Render env | Allowed CORS origins |
| `NEXT_PUBLIC_API_URL` | `frontend/.env.local` | Backend URL for local dev (default: `http://localhost:8000`) |
| `BACKEND_URL` | Docker / Render | Internal backend URL for Next.js rewrites (default: `http://127.0.0.1:8000`) |

## How It Works

1. **User searches** for a problem by slug or LeetCode URL.
2. **Backend fetches** the problem from LeetCode's GraphQL API (with retry/backoff for rate limits).
3. **Tagger chain** classifies the problem into DSA patterns (e.g., "Two Pointers", "Dynamic Programming").
4. **Editorialist chain** generates a full editorial with the identified patterns as context — including brute force analysis, mental model, ASCII visual trace, implementation deep dive, multi-language code, complexity analysis, and edge cases.
5. **Frontend renders** the editorial in a split-pane view (problem left, editorial right) with syntax highlighting, pattern pills, and theme support.
6. **Cache stores** the result in memory so repeated requests for the same problem are instant.

## License

MIT
