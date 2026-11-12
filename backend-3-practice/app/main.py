from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI

from .categories import router as categories_router
from .database import DEFAULT_DATABASE, initialize_database, make_engine
from .masters import router as masters_router


def create_app(database_path: str | Path | None = None, *, seed: bool = True) -> FastAPI:
    path = Path(database_path) if database_path is not None else DEFAULT_DATABASE
    engine = make_engine(path)

    @asynccontextmanager
    async def lifespan(application: FastAPI):
        path.resolve().parent.mkdir(parents=True, exist_ok=True)
        try:
            initialize_database(engine, seed=seed)
            yield
        finally:
            engine.dispose()

    application = FastAPI(
        title='У Дяди Билли — API салона',
        version='1.0.0',
        description='Категории услуг и мастера. Мастеры хранятся в SQLite.',
        lifespan=lifespan,
    )
    application.state.engine = engine
    application.include_router(categories_router)
    application.include_router(masters_router)

    @application.get('/', tags=['Служебные'], summary='Проверка работоспособности')
    def root() -> dict[str, str]:
        return {'status': 'ok', 'docs': '/docs'}

    return application


app = create_app()