from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status, Path, Body
from sqlalchemy.orm import Session

from .models import UserDataUpdate, UserGoalUpdate
from .service import (
    get_user_by_id,
    update_user_data_by_id,
    update_goal_chest_by_id,
    update_goal_back_by_id,
    update_goal_leg_by_id,
    update_goal_shoulder_by_id,
    update_goal_arm_by_id
)
from ..database.utils import get_db
from ..auth.service import verify_token

user_router = APIRouter(
    prefix = '/user'
)

@user_router.patch("/{user_id}")
def update_user(
    user_id: Annotated[str, Path(title="A ID do usuário")], 
    user: Annotated[UserDataUpdate, Body(embed=True)], 
    db: Session = Depends(get_db)
):
    payload = verify_token(token=user.token)
    if user_id != payload.get("sub"):
        user_id = payload.get("sub")
    lookup_user = get_user_by_id(db=db, user_id=user_id)
    if not lookup_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não existe!"
        )
    update_user_data_by_id(db=db, user_id=user_id, user_data=UserDataUpdate)
    return "complete"

@user_router.patch("/chest_goal/{user_id}")
def update_chest_goal(
    user_id: Annotated[str, Path(title="A ID do usuário")], 
    user: Annotated[UserGoalUpdate, Body(embed=True)],
    db: Session = Depends(get_db)
):
    payload = verify_token(token=user.token)
    if user_id != payload.get("sub"):
        user_id = payload.get("sub")
    lookup_user = get_user_by_id(db=db, user_id=user_id)
    if not lookup_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não existe!"
        )
    update_goal_chest_by_id(db=db, user_id=user_id, user_goal=user)
    return "complete"

@user_router.patch("/back_goal/{user_id}")
def update_back_goal(
    user_id: Annotated[str, Path(title="A ID do usuário")], 
    user: Annotated[UserGoalUpdate, Body(embed=True)],
    db: Session = Depends(get_db)
):
    payload = verify_token(token=user.token)
    if user_id != payload.get("sub"):
        user_id = payload.get("sub")
    lookup_user = get_user_by_id(db=db, user_id=user_id)
    if not lookup_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não existe!"
        )
    update_goal_back_by_id(db=db, user_id=user_id, user_goal=user)
    return "complete"

@user_router.patch("/leg_goal/{user_id}")
def update_leg_goal(
    user_id: Annotated[str, Path(title="A ID do usuário")], 
    user: Annotated[UserGoalUpdate, Body(embed=True)],
    db: Session = Depends(get_db)
):
    payload = verify_token(token=user.token)
    if user_id != payload.get("sub"):
        user_id = payload.get("sub")
    lookup_user = get_user_by_id(db=db, user_id=user_id)
    if not lookup_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não existe!"
        )
    update_goal_leg_by_id(db=db, user_id=user_id, user_goal=user)
    return "complete"

@user_router.patch("/shoulder_goal/{user_id}")
def update_shoulder_goal(
    user_id: Annotated[str, Path(title="A ID do usuário")], 
    user: Annotated[UserGoalUpdate, Body(embed=True)],
    db: Session = Depends(get_db)
):
    payload = verify_token(token=user.token)
    if user_id != payload.get("sub"):
        user_id = payload.get("sub")
    lookup_user = get_user_by_id(db=db, user_id=user_id)
    if not lookup_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não existe!"
        )
    update_goal_shoulder_by_id(db=db, user_id=user_id, user_goal=user)
    return "complete"

@user_router.patch("/arm_goal/{user_id}")
def update_arm_goal(
    user_id: Annotated[str, Path(title="A ID do usuário")], 
    user: Annotated[UserGoalUpdate, Body(embed=True)],
    db: Session = Depends(get_db)
):
    payload = verify_token(token=user.token)
    if user_id != payload.get("sub"):
        user_id = payload.get("sub")
    lookup_user = get_user_by_id(db=db, user_id=user_id)
    if not lookup_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não existe!"
        )
    update_goal_arm_by_id(db=db, user_id=user_id, user_goal=user)
    return "complete"