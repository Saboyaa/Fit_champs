from datetime import date
from typing import List

from pydantic import BaseModel, Field

class TrainExerciseCreate(BaseModel):
    exercise_id: int = Field(title="ID do exercício do treino")
    load: int = Field(title="Carga do exercício do treino")
    repetitions: str = Field(title="Repetições do exercício do treino", max_length=4)

class TrainCreate(BaseModel):
    muscular_group: str = Field(title="Grupo muscular que o treino desenvolveu", max_length=10)
    train_date: date = Field(title="Data em que o treino foi realizado")
    exercises: List[TrainExerciseCreate] = Field(title="Lista dos exercícios no treino")