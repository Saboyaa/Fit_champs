from typing import Annotated, List
from datetime import date

from fastapi import APIRouter, Depends, Path, Body
from sqlalchemy.orm import Session

from ..database.models import User
from .utils import (
    group_exercises_by_muscle
)
from .models import TrainCreate

from .service import (
    get_stored_exercises,
    get_trains_by_interval_and_user_id,
    create_train,
    delete_train_exercise_by_train_exercise_id_and_user_id
)
from ..database.utils import get_db
from ..auth.service import get_current_user

exercise_router = APIRouter(
    prefix = '/exercise'
)

# Endpoint para pegar os exercícios disponíveis no banco de dados
@exercise_router.get("")
def get_exercises(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    stored_exercises = get_stored_exercises(db)
    grouped_exercises = group_exercises_by_muscle(stored_exercises)

    return grouped_exercises

# Endpoint para pegar os treinos de um usuário dado uma data
@exercise_router.get("/trains/three_month")
def get_trains_of_three_month(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    return get_trains_by_interval_and_user_id(db, user_id=current_user.id, train_interval=90)

# Endpoint para criar os treinos de um usuário
@exercise_router.post("/trains")
def create_trains(
    trains: Annotated[List[TrainCreate], Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    created_trains = create_train(db=db, user_id=current_user.id, trains_data=trains)

    return created_trains

# Endpoint para deletar o exercício de um treino específico de um dado usuário
# @exercise_router.delete("/trains_exercises/{train_exercise_id}")
# def delete_trains_exercises(
#     train_exercise_id: Annotated[int, Path(title="ID do exércicio do treino a ser deletado")],
#     current_user: Annotated[User, Depends(get_current_user)],
#     db: Session = Depends(get_db)
# ):
#     delete_train_exercise_by_train_exercise_id_and_user_id(db, user_id=current_user.id, train_exercise_id=train_exercise_id)

#     return "complete"