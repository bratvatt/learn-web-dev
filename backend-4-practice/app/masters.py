from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from .database import get_session
from .models import Master
from .schemas import MasterRead

router = APIRouter(prefix='/masters', tags=['Мастера'])

SessionDependency = Annotated[Session, Depends(get_session)]


@router.get(
    '/',
    response_model=list[MasterRead],
    summary='Список мастеров',
    description='Все мастера из БД. Необязательный фильтр по специализации.',
)
def list_masters(
    session: SessionDependency,
    specialization: Annotated[
        str | None,
        Query(description='Специализация, например «Парикмахер»'),
    ] = None,
) -> list[Master]:
    statement = select(Master).order_by(Master.id)
    if specialization is not None and specialization.strip():
        statement = statement.where(
            func.lower(Master.specialization) == specialization.strip().lower()
        )
    return list(session.scalars(statement).all())


@router.get(
    '/{master_id}',
    response_model=MasterRead,
    summary='Информация о мастере',
    responses={
        status.HTTP_404_NOT_FOUND: {
            'description': 'Мастер не найден',
            'content': {
                'application/json': {'example': {'detail': 'Master not found'}}
            },
        }
    },
)
def get_master(master_id: int, session: SessionDependency) -> Master:
    master = session.get(Master, master_id)
    if master is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Master not found',
        )
    return master