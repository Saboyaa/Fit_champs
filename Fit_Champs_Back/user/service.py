from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from ..database.models import User
from .models import UserDataUpdate, UserGoalUpdate

# Procura usuário pelo seu id
def get_user_by_id(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()

# Atualiza os dados de um usuário dado o seu id
def update_user_data_by_id(db: Session, user_id: str, user_data: UserDataUpdate):
    db \
        .query(User) \
        .filter(User.id == user_id) \
        .update({
            User.username: user_data.username,
            User.email: user_data.email,
            User.city: user_data.city,
            User.age: user_data.age,
            User.phone: user_data.phone,
            User.height: user_data.height,
            User.weight: user_data.weight
        })
    db.commit()
    return "complete"
    
# Atualiza a meta de um usuário dado o grupo muscular e o seu id
def update_goal_chest_by_id(db: Session, user_id: str, user_goal: UserGoalUpdate):
    db \
        .query(User) \
        .filter(User.id == user_id) \
        .update({
            User.goal_chest: UserGoalUpdate.goal
        })
    db.commit()
    return "complete"

def update_goal_back_by_id(db: Session, user_id: str, user_goal: UserGoalUpdate):
    db \
        .query(User) \
        .filter(User.id == user_id) \
        .update({
            User.goal_back: UserGoalUpdate.goal
        })
    db.commit()
    return "complete"

def update_goal_leg_by_id(db: Session, user_id: str, user_goal: UserGoalUpdate):
    db \
        .query(User) \
        .filter(User.id == user_id) \
        .update({
            User.goal_leg: UserGoalUpdate.goal
        })
    db.commit()
    return "complete"

def update_goal_shoulder_by_id(db: Session, user_id: str, user_goal: UserGoalUpdate):
    db \
        .query(User) \
        .filter(User.id == user_id) \
        .update({
            User.goal_shoulder: UserGoalUpdate.goal
        })
    db.commit()
    return "complete"

def update_goal_arm_by_id(db: Session, user_id: str, user_goal: UserGoalUpdate):
    db \
        .query(User) \
        .filter(User.id == user_id) \
        .update({
            User.goal_arm: UserGoalUpdate.goal
        })
    db.commit()
    return "complete"