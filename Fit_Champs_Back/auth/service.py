from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

from ..database.utils import get_db
from ..database.models import User
from ..user.service import get_user_by_id
from .models import UserCreate, TokenData

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "499db2db186e24893434b7a938277d6e2dac36a8e807a77bc96356287778be2f"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Procura usuário pelo seu nome
def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

# Cria usuário
def create_user(db: Session, user: UserCreate):
    if user.password != user.confirm_password:
        return False
    hashed_password = pwd_context.hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        city=user.city,
        sex=user.sex,
        age=user.age,
        phone=user.phone,
        height=user.height,
        weight=user.weight
    )
    db.add(db_user)
    db.commit()
    return "complete"

# Autentica o usuário
def authenticate_user(username: str, password: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user

# Cria o jwt token para o usuário autenticado
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
    
# Verifica o usuário logado atualmente
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id = payload.get("sub")
        if id is None:
            raise credentials_exception
        token_data = TokenData(id=id)
    except JWTError:
      raise credentials_exception
    user = get_user_by_id(db=db, user_id=token_data.id)
    if user is None:
        raise credentials_exception
    return user
