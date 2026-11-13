from collections import Counter

from fastapi import APIRouter, HTTPException, status

from .data import Category, categories, services
from .schemas import CategoryRead

router = APIRouter(tags=['Категории'])


def count_services() -> Counter[int]:
    return Counter(service.category_id for service in services)


def serialize_category(category: Category, counts: Counter[int]) -> CategoryRead:
    return CategoryRead(
        id=category.id,
        name=category.name,
        servicesCount=counts.get(category.id, 0),
    )


@router.get(
    '/',
    response_model=list[CategoryRead],
    summary='Список категорий',
    description='Возвращает все категории услуг с количеством услуг в каждой.',
)
def list_categories() -> list[CategoryRead]:
    counts = count_services()
    return [serialize_category(category, counts) for category in categories]


@router.get(
    '/{category_id}',
    response_model=CategoryRead,
    summary='Информация о категории',
    responses={
        status.HTTP_404_NOT_FOUND: {
            'description': 'Категория не найдена',
            'content': {
                'application/json': {'example': {'detail': 'Category not found'}}
            },
        }
    },
)
def get_category(category_id: int) -> CategoryRead:
    category = next((item for item in categories if item.id == category_id), None)
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Category not found',
        )
    return serialize_category(category, count_services())