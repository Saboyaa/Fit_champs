from typing import Annotated

from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session

from ..database.models import User
from .models import RankBody
from .service import (
    get_arm_rank_by_age_and_gender,
    get_back_rank_by_age_and_gender,
    get_chest_rank_by_age_and_gender, 
    get_general_rank_by_age_and_gender,
    get_leg_rank_by_age_and_gender,
    get_shoulder_rank_by_age_and_gender
)
from ..database.utils import get_db
from ..auth.service import get_current_user

rank_router = APIRouter(
    prefix = '/rank'
)

@rank_router.get("/general")
def get_general_rank(
    rank_body: Annotated[RankBody, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
): 
    return get_general_rank_by_age_and_gender(db=db, rank_body=rank_body)

@rank_router.get("/arm")
def get_arm_rank(
    rank_body: Annotated[RankBody, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
): 
    return get_arm_rank_by_age_and_gender(db=db, rank_body=rank_body)

@rank_router.get("/back")
def get_back_rank(
    rank_body: Annotated[RankBody, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
): 
    return get_back_rank_by_age_and_gender(db=db, rank_body=rank_body)

@rank_router.get("/chest")
def get_chest_rank(
    rank_body: Annotated[RankBody, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
): 
    return get_chest_rank_by_age_and_gender(db=db, rank_body=rank_body)

@rank_router.get("/leg")
def get_leg_rank(
    rank_body: Annotated[RankBody, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
): 
    return get_leg_rank_by_age_and_gender(db=db, rank_body=rank_body)

@rank_router.get("/shoulder")
def get_shoulder_rank(
    rank_body: Annotated[RankBody, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
): 
    return get_shoulder_rank_by_age_and_gender(db=db, rank_body=rank_body)