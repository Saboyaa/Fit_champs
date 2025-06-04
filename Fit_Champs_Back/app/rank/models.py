from pydantic import BaseModel, Field

from ..database.models import Gender

class RankBody(BaseModel):
    gender: Gender = Field(title="Gênero do usuário", max_length=1)
    age: int = Field(title="Idade do usuário")