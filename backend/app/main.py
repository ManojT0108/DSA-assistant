from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes import daily, hint, solve
from app.routes.assist import router as assist_router

app = FastAPI(title="Find My Editorial", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(daily.router)
app.include_router(solve.router)
app.include_router(hint.router)
app.include_router(assist_router)


@app.get("/health")
async def health():
    return {"status": "ok"}
