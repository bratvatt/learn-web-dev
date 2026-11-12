from fastapi import FastAPI

from .categories import router as categories_router

app = FastAPI(
    title='У Дяди Билли — API салона',
    version='1.0.0',
    description='Учебный API: категории услуг и запись клиентов.',
)

app.include_router(categories_router, prefix='/categories')


@app.get('/', tags=['Служебные'], summary='Проверка работоспособности')
def root() -> dict[str, str]:
    return {'status': 'ok', 'docs': '/docs'}