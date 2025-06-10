from math import inf

from sqlalchemy import select, between
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from ..database.models import (
    ChestRank,
    BackRank,
    ArmRank,
    LegRank,
    ShoulderRank,
    GeneralRank
)

def get_chest_rank_by_age_and_gender(db: Session, gender: str, age: int):
    if age < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Idade inválida para consulta"
        )
    if gender not in ["M", "F"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Gênero inválido para consulta"
        )
    
    lower_age = 0
    bigger_age = 0
    if age >= 10 and age <= 20:
        lower_age = 10
        bigger_age = 20
    elif age > 20 and age <= 40:
        lower_age = 21
        bigger_age = 40
    elif age > 40 and age <= 60:
        lower_age = 41
        bigger_age = 60
    else:
        lower_age = 60
        bigger_age = 2147483647

    return db.execute(
        select(ChestRank.id, ChestRank.age, ChestRank.sex, ChestRank.total_volume) \
        .where(
            ChestRank.sex == gender,
            between(ChestRank.age, lower_age, bigger_age)
        ) \
        .order_by(ChestRank.total_volume.desc())
        .limit(5)
    ).all()
    
def get_back_rank_by_age_and_gender(db: Session, gender: str, age: int):
    if age < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Idade inválida para consulta"
        )
    if gender not in ["M", "F"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Gênero inválido para consulta"
        )
    
    lower_age = 0
    bigger_age = 0
    if age >= 10 and age <= 20:
        lower_age = 10
        bigger_age = 20
    elif age > 20 and age <= 40:
        lower_age = 21
        bigger_age = 40
    elif age > 40 and age <= 60:
        lower_age = 41
        bigger_age = 60
    else:
        lower_age = 60
        bigger_age = 2147483647

    return db.execute(
        select(BackRank.id, BackRank.age, BackRank.sex, BackRank.total_volume) \
        .where(
            BackRank.sex == gender,
            between(BackRank.age, lower_age, bigger_age)
        ) \
        .order_by(BackRank.total_volume.desc())
        .limit(5)
    ).all()

def get_shoulder_rank_by_age_and_gender(db: Session, gender: str, age: int):
    if age < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Idade inválida para consulta"
        )
    if gender not in ["M", "F"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Gênero inválido para consulta"
        )
    
    lower_age = 0
    bigger_age = 0
    if age >= 10 and age <= 20:
        lower_age = 10
        bigger_age = 20
    elif age > 20 and age <= 40:
        lower_age = 21
        bigger_age = 40
    elif age > 40 and age <= 60:
        lower_age = 41
        bigger_age = 60
    else:
        lower_age = 60
        bigger_age = 2147483647

    return db.execute(
        select(ShoulderRank.id, ShoulderRank.age, ShoulderRank.sex, ShoulderRank.total_volume) \
        .where(
            ShoulderRank.sex == gender,
            between(ShoulderRank.age, lower_age, bigger_age)
        ) \
        .order_by(ShoulderRank.total_volume.desc())
        .limit(5)
    ).all()
    
def get_leg_rank_by_age_and_gender(db: Session, gender: str, age: int):
    if age < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Idade inválida para consulta"
        )
    if gender not in ["M", "F"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Gênero inválido para consulta"
        )
    
    lower_age = 0
    bigger_age = 0
    if age >= 10 and age <= 20:
        lower_age = 10
        bigger_age = 20
    elif age > 20 and age <= 40:
        lower_age = 21
        bigger_age = 40
    elif age > 40 and age <= 60:
        lower_age = 41
        bigger_age = 60
    else:
        lower_age = 60
        bigger_age = 2147483647

    return db.execute(
        select(LegRank.id, LegRank.age, LegRank.sex, LegRank.total_volume) \
        .where(
            LegRank.sex == gender,
            between(LegRank.age, lower_age, bigger_age)
        ) \
        .order_by(LegRank.total_volume.desc())
        .limit(5)
    ).all()

def get_arm_rank_by_age_and_gender(db: Session, gender: str, age: int):
    if age < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Idade inválida para consulta"
        )
    if gender not in ["M", "F"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Gênero inválido para consulta"
        )
    
    lower_age = 0
    bigger_age = 0
    if age >= 10 and age <= 20:
        lower_age = 10
        bigger_age = 20
    elif age > 20 and age <= 40:
        lower_age = 21
        bigger_age = 40
    elif age > 40 and age <= 60:
        lower_age = 41
        bigger_age = 60
    else:
        lower_age = 60
        bigger_age = 2147483647

    return db.execute(
        select(ArmRank.id, ArmRank.age, ArmRank.sex, ArmRank.total_volume) \
        .where(
            ArmRank.sex == gender,
            between(ArmRank.age, lower_age, bigger_age)
        ) \
        .order_by(ArmRank.total_volume.desc())
        .limit(5)
    ).all()

def get_general_rank_by_age_and_gender(db: Session, gender: str, age: int):
    if age < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Idade inválida para consulta"
        )
    if gender not in ["M", "F"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Gênero inválido para consulta"
        )
    
    lower_age = 0
    bigger_age = 0
    if age >= 10 and age <= 20:
        lower_age = 10
        bigger_age = 20
    elif age > 20 and age <= 40:
        lower_age = 21
        bigger_age = 40
    elif age > 40 and age <= 60:
        lower_age = 41
        bigger_age = 60
    else:
        lower_age = 60
        bigger_age = 2147483647

    return db.execute(
        select(GeneralRank.id, GeneralRank.age, GeneralRank.sex, GeneralRank.total_volume) \
        .where(
            GeneralRank.sex == gender,
            between(GeneralRank.age, lower_age, bigger_age)
        ) \
        .order_by(GeneralRank.total_volume.desc())
        .limit(5)
    ).all()

def get_total_volume_by_user(db: Session, user_id: int):
    pass