from pydantic import BaseModel, ConfigDict, Field


class CategoryRead(BaseModel):
    id: int
    name: str
    servicesCount: int = Field(ge=0)


class MasterRead(BaseModel):
    """Мастер из БД. from_attributes позволяет читать SQLAlchemy-объект."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    specialization: str