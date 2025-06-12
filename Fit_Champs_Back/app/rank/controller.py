from enum import Enum
from typing import Annotated

from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session

from ..database.models import User
from .service import (
    get_arm_rank_by_age_and_gender,
    get_back_rank_by_age_and_gender,
    get_chest_rank_by_age_and_gender, 
    get_general_rank_by_age_and_gender,
    get_leg_rank_by_age_and_gender,
    get_shoulder_rank_by_age_and_gender,
    get_total_volume_by_user
)
from ..database.utils import get_db
from ..auth.service import get_current_user


rank_router = APIRouter(
    prefix = '/rank'
)

@rank_router.get("/general/{gender}/{age}")
def get_general_rank(
    gender: Annotated[str, Path(title="O genêro que se deseja o ranque")],
    age: Annotated[int, Path(title="A idade em que se deseja obter o ranque")],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
): 
    return get_general_rank_by_age_and_gender(db=db, gender=gender, age=age)

@rank_router.get("/arm/{gender}/{age}")
def get_arm_rank(
    gender: Annotated[str, Path(title="O genêro que se deseja o ranque")],
    age: Annotated[int, Path(title="A idade em que se deseja obter o ranque")],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
): 
    return get_arm_rank_by_age_and_gender(db=db, gender=gender, age=age)

@rank_router.get("/back/{gender}/{age}")
def get_back_rank(
    gender: Annotated[str, Path(title="O genêro que se deseja o ranque")],
    age: Annotated[int, Path(title="A idade em que se deseja obter o ranque")],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
): 
    return get_back_rank_by_age_and_gender(db=db, gender=gender, age=age)

@rank_router.get("/chest/{gender}/{age}")
def get_chest_rank(
    gender: Annotated[str, Path(title="O genêro que se deseja o ranque")],
    age: Annotated[int, Path(title="A idade em que se deseja obter o ranque")],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
): 
    return get_chest_rank_by_age_and_gender(db=db, gender=gender, age=age)

@rank_router.get("/leg/{gender}/{age}")
def get_leg_rank(
    gender: Annotated[str, Path(title="O genêro que se deseja o ranque")],
    age: Annotated[int, Path(title="A idade em que se deseja obter o ranque")],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
): 
    return get_leg_rank_by_age_and_gender(db=db, gender=gender, age=age)

@rank_router.get("/shoulder/{gender}/{age}")
def get_shoulder_rank(
    gender: Annotated[str, Path(title="O genêro que se deseja o ranque")],
    age: Annotated[int, Path(title="A idade em que se deseja obter o ranque")],
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
): 
    return get_shoulder_rank_by_age_and_gender(db=db, gender=gender, age=age)

@rank_router.get("/total_volume")
def get_total_volume(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    return get_total_volume_by_user(db=db, user_id=current_user.id)