from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .models import UserCreate, Token
from .service import get_user_by_email, create_user, authenticate_user, create_access_token
from ..database.utils import get_db

ACCESS_TOKEN_EXPIRE_MINUTES = 30

auth_router = APIRouter(
    prefix = '/auth'
)

@auth_router.post("/signup")
def register_user(
    user: Annotated[UserCreate, Body(embed=True)], 
    db: Session = Depends(get_db)
):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Esse usuário já está cadastrado!")
    state = create_user(db=db, user=user)
    if not state:
        raise HTTPException(status_code=400, detail="As senhas são diferentes!")
    return state

@auth_router.post("/login")
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], 
    db: Session = Depends(get_db)
):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha incorretos!",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")
