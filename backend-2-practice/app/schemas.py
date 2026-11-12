from pydantic import BaseModel, ConfigDict, Field


class CategoryRead(BaseModel):

    model_config = ConfigDict(
        json_schema_extra={
            'example': {'id': 1, 'name': 'Стрижки и укладки', 'servicesCount': 5}
        }
    )

    id: int
    name: str
    servicesCount: int = Field(ge=0, description='Количество услуг в категории')