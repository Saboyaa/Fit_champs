from typing import Annotated

from fastapi import APIRouter, Depends, Path, Body
from sqlalchemy.orm import Session

from ..database.models import User
from .models import UserDataUpdate, UserGoalUpdate
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

@user_router.get()
def get_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    return current_user

@user_router.patch("/{user_id}")
def update_user(
    user_id: Annotated[str, Path(title="A ID do usuário")], 
    user_data: Annotated[UserDataUpdate, Body(embed=True)], 
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db),
):
    if user_id != current_user.id:
        user_id = current_user.id
    update_user_data_by_id(db=db, user_id=user_id, user_data=user_data)
    return "complete"

@user_router.patch("/chest_goal/{user_id}")
def update_chest_goal(
    user_id: Annotated[str, Path(title="A ID do usuário")], 
    user: Annotated[UserGoalUpdate, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    if user_id != current_user.id:
        user_id = current_user.id
    update_goal_chest_by_id(db=db, user_id=user_id, user_goal=user)
    return "complete"

@user_router.patch("/back_goal/{user_id}")
def update_back_goal(
    user_id: Annotated[str, Path(title="A ID do usuário")], 
    user_goal: Annotated[UserGoalUpdate, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    if user_id != current_user.id:
        user_id = current_user.id
    update_goal_back_by_id(db=db, user_id=user_id, user_goal=user_goal)
    return "complete"

@user_router.patch("/leg_goal/{user_id}")
def update_leg_goal(
    user_id: Annotated[str, Path(title="A ID do usuário")], 
    user_goal: Annotated[UserGoalUpdate, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    if user_id != current_user.id:
        user_id = current_user.id
    update_goal_leg_by_id(db=db, user_id=user_id, user_goal=user_goal)
    return "complete"

@user_router.patch("/shoulder_goal/{user_id}")
def update_shoulder_goal(
    user_id: Annotated[str, Path(title="A ID do usuário")], 
    user_goal: Annotated[UserGoalUpdate, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    if user_id != current_user.id:
        user_id = current_user.id
    update_goal_shoulder_by_id(db=db, user_id=user_id, user_goal=user_goal)
    return "complete"

@user_router.patch("/arm_goal/{user_id}")
def update_arm_goal(
    user_id: Annotated[str, Path(title="A ID do usuário")], 
    user_goal: Annotated[UserGoalUpdate, Body(embed=True)],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    if user_id != current_user.id:
        user_id = current_user.id
    update_goal_arm_by_id(db=db, user_id=user_id, user_goal=user_goal)
    return "complete"