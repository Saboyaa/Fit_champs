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

    return db.scalars(
        select(ChestRank) \
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

    return db.scalars(
        select(BackRank) \
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

    return db.scalars(
        select(ShoulderRank) \
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

    return db.scalars(
        select(LegRank) \
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

    return db.scalars(
        select(ArmRank) \
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

    return db.scalars(
        select(GeneralRank) \
        .where(
            GeneralRank.sex == gender,
            between(GeneralRank.age, lower_age, bigger_age)
        ) \
        .order_by(GeneralRank.total_volume.desc())
        .limit(5)
    ).all()

def get_total_volume_by_user(db: Session, user_id: int):
    general_total_volume = db.scalars(
        select(GeneralRank.total_volume) \
        .where(GeneralRank.id == user_id)
    ).first()

    arm_total_volume = db.scalars(
        select(ArmRank.total_volume) \
        .where(ArmRank.id == user_id)
    ).first()

    back_total_volume = db.scalars(
        select(BackRank.total_volume) \
        .where(BackRank.id == user_id)
    ).first()

    chest_total_volume = db.scalars(
        select(ChestRank.total_volume) \
        .where(ChestRank.id == user_id)
    ).first()

    leg_total_volume = db.scalars(
        select(LegRank.total_volume) \
        .where(LegRank.id == user_id)
    ).first()

    shoulder_total_volume = db.scalars(
        select(ShoulderRank.total_volume) \
        .where(ShoulderRank.id == user_id)
    ).first() 

    return {
        "general_total_volume": general_total_volume if general_total_volume else 0,
        "arm_total_volume": arm_total_volume if arm_total_volume else 0,
        "back_total_volume": back_total_volume if back_total_volume else 0,
        "chest_total_volume": chest_total_volume if chest_total_volume else 0,
        "leg_total_volume": leg_total_volume if leg_total_volume else 0,
        "shoulder_total_volume": shoulder_total_volume if shoulder_total_volume else 0
    }