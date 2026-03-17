from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    google_api_key: str = ""
    gemini_model: str = "gemini-1.5-flash"
    leetcode_api_base: str = "https://alfa-leetcode-api.onrender.com"
    cors_origins: list[str] = ["http://localhost:3000"]

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
