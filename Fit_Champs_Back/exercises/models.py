import datetime
from typing import Literal

from pydantic import BaseModel, Field

class ExerciseCreate(BaseModel):
    repetitions: str = Field(title="Repetições realizadas pelo usuário", max_length=4)
    load: int = Field(title="Carga do exércicio realizado pelo usuário", ge=0)
    train_date: datetime.date = Field(title="Data em que foi realizado o exércicio")
    muscular_group: Literal["Peito", "Costas", "Ombro", "Perna", "Braço"] = Field(title="Grupo muscular do exércicio realizado")
    exercise: str = Field(title="Exércicio realizado pelo usuário", max_length=40)
