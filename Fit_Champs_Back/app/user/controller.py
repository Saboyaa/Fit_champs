from typing import Annotated

from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session

from ..database.models import User
from .models import UserDataUpdate, UserGoalUpdate, UserGet
from .service import (
    update_user_data_by_id,
    update_goal_chest_by_id,
    update_goal_back_by_id,
    update_goal_leg_by_id,
    update_goal_shoulder_by_id,
    update_goal_arm_by_id
)
from ..database.utils import get_db
from ..auth.service import get_current_user

user_router = APIRouter(
    prefix = '/user'
)

@user_router.get("")
def get_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    return UserGet(
        id=current_user.id,
        username=current_user.username,
        email=current_user.email,
        city=current_user.city,
        sex=current_user.sex,
        age=current_user.age,
        phone=current_user.phone,
        height=current_user.height,
        weight=current_user.weight,
        rank_chest=current_user.rank_chest,
        rank_back=current_user.rank_back,
        rank_arm=current_user.rank_arm,
        rank_leg=current_user.rank_leg,
        rank_shoulder=current_user.rank_shoulder,
        rank_general=current_user.rank_general,
        goal_chest=current_user.goal_chest,
        goal_back=current_user.goal_back,
        goal_arm=current_user.goal_arm,
        goal_leg=current_user.goal_leg,
        goal_shoulder=current_user.goal_shoulder
    )

@user_router.patch("")
def update_user(
    user_data: Annotated[UserDataUpdate, Body(embed=True)], 
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db),
):
    update_user_data_by_id(db=db, user_id=current_user.id, user_data=user_data)
    return "complete"

@user_router.patch("/chest_goal")
def update_chest_goal(
    user_goal: Annotated[UserGoalUpdate, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    update_goal_chest_by_id(db=db, user_id=current_user.id, user_goal=user_goal)
    return "complete"

@user_router.patch("/back_goal")
def update_back_goal(
    user_goal: Annotated[UserGoalUpdate, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    update_goal_back_by_id(db=db, user_id=current_user.id, user_goal=user_goal)
    return "complete"

@user_router.patch("/leg_goal")
def update_leg_goal(
    user_goal: Annotated[UserGoalUpdate, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    update_goal_leg_by_id(db=db, user_id=current_user.id, user_goal=user_goal)
    return "complete"

@user_router.patch("/shoulder_goal")
def update_shoulder_goal(
    user_goal: Annotated[UserGoalUpdate, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    update_goal_shoulder_by_id(db=db, user_id=current_user.id, user_goal=user_goal)
    return "complete"

@user_router.patch("/arm_goal")
def update_arm_goal(
    user_goal: Annotated[UserGoalUpdate, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    update_goal_arm_by_id(db=db, user_id=current_user.id, user_goal=user_goal)
    return "complete"