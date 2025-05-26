from typing import Dict, List, Tuple
from datetime import date

from sqlalchemy import select, and_, between, tuple_, delete
from sqlalchemy.orm import Session, selectinload
from fastapi import HTTPException, status

from ..database.models import (
    Train, 
    TrainExercise,
    Exercise
)
from .models import TrainCreate
from .utils import get_week_bounds

def get_stored_exercises(db: Session):
    return db.scalars(select(Exercise)).all()

def get_trains_by_date_and_user_id(db: Session, user_id: str, train_date: date):
    monday, sunday = get_week_bounds(train_date)

    return db.scalars(
        select(Train) \
        .where(
            and_(Train.user_id == user_id,
            between(Train.train_date, monday, sunday))
        ) \
        .options(
            selectinload(Train.exercises).selectinload(TrainExercise.exercise)
        )
    ).all()

def create_train(db: Session, user_id: str, trains_data: List[TrainCreate]):
    if not trains_data:
        return []
    
    all_exercise_ids = set()
    key_tuples = set()
    for train in trains_data:
        all_exercise_ids.update(ex.exercise_id for ex in train.exercises)
        key_tuples.add((user_id, train.train_date, train.muscular_group))
    
    exercises_by_id = {
        e.id: e for e in db.scalars(
            select(Exercise).where(Exercise.id.in_(all_exercise_ids))
        ).all()
    }

    existing_trains = db.scalars(
        select(Train).where(
            tuple_(Train.user_id, Train.train_date, Train.muscular_group).in_(key_tuples)
        )
    ).all()

    train_lookup: Dict[Tuple[int, date, str], Train] = {
        (t.user_id, t.train_date, t.muscular_group): t for t in existing_trains
    }

    result_trains = []

    for train_data in trains_data:
        train_date = train_data.train_date
        muscular_group = train_data.muscular_group
        exercises = train_data.exercises

        mismatched = [
            ex_id for ex_id in [ex.exercise_id for ex in exercises]
            if exercises_by_id[ex_id].muscular_group != muscular_group
        ]
        if mismatched:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Exercícios de grupos musculares distintos"
            )

        key = (user_id, train_date, muscular_group)
        train = train_lookup.get(key)

        if train:
            # exercises_to_delete_id = [ex.exercise_id for ex in train.exercises]
            # db.execute(
            #     delete(TrainExercise) \
            #     .where(TrainExercise.exercise_id.in_(exercises_to_delete_id))
            # )
            train.exercises.clear()
        else:
            train = Train(
                user_id=user_id,
                train_date=train_date,
                muscular_group=muscular_group
            )
            db.add(train)
            db.flush()
            train_lookup[key] = train

        for ex in exercises:
            train_exercise = TrainExercise(
                train_id=train.id,
                exercise_id=ex.exercise_id,
                repetitions=ex.repetitions,
                load=ex.load
            )
            train.exercises.append(train_exercise)

        result_trains.append(train)

    db.commit()

    return result_trains

    
def delete_train_exercise_by_train_exercise_id_and_user_id(db: Session, user_id: str, train_exercise_id: int):
    train_exercise = db.scalars(
        select(TrainExercise) \
        .where(TrainExercise.id == train_exercise_id) \
        .options(selectinload(TrainExercise.train))
    ).first()

    if train_exercise.train.user_id != int(user_id):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Você não possui permissão para isso",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    db.delete(train_exercise)
    db.commit()

    return True

# def create_train(db: Session, user_id: str, train_data: List[TrainCreate]):
#     created_trains: List[Train] = []

#     for train in train_data:
#         new_train = Train(
#             user_id = int(user_id),
#             muscular_group = train.muscular_group,
#             train_date = train.train_date
#         )

#         for ex in train.exercises:
#             new_exercise = TrainExercise(
#                 exercise_id = ex.exercise_id,
#                 repetitions = ex.repetitions,
#                 load = ex.load
#             )
#             new_train.exercises.append(new_exercise)

#         db.add(new_train)
#         created_trains.append(new_train)

#     db.commit()
#     return created_trains