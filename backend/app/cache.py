from app.models import EditorialResponse

_cache: dict[str, EditorialResponse] = {}


def get(slug: str) -> EditorialResponse | None:
    return _cache.get(slug)


def put(slug: str, response: EditorialResponse) -> None:
    _cache[slug] = response
