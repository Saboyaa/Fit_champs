from typing import List
from datetime import date, timedelta

from sqlalchemy import insert, between
from sqlalchemy.orm import Session

from ..database.models import Exercise
from .models import ExerciseCreate

# Adiciona um novo exercício para o usuário dado o seu id
def add_exercises(db: Session, user_id: str, exercise_create: List[ExerciseCreate]):
    exercises_serialized = [exercise.model_dump().update({'user_id': user_id}) for exercise in exercise_create]
    db \
        .execute(
            insert(Exercise),
            exercises_serialized
        )
    db.commit()
    return "complete"
        
def get_exercises_by_id_and_date(db: Session, user_id: str, train_date: date):
    weekday = train_date.weekday()
    sunday = train_date - timedelta(days=((weekday + 1) % 7))
    saturday = sunday + timedelta(days=6)

    db \
        .query(Exercise) \
        .filter(between(Exercise.train_date, sunday, saturday), Exercise.user_id == user_id)
        
