from app.models import EditorialResponse, TagResult

_cache: dict[str, EditorialResponse] = {}
_tag_cache: dict[str, TagResult] = {}


def get(slug: str) -> EditorialResponse | None:
    return _cache.get(slug)


def put(slug: str, response: EditorialResponse) -> None:
    _cache[slug] = response


def get_tags(key: str) -> TagResult | None:
    return _tag_cache.get(key)


def put_tags(key: str, result: TagResult) -> None:
    _tag_cache[key] = result
