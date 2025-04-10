from sqlalchemy import Column, Integer, String
from pydantic import BaseModel

from ..database.core import Base
from ..database.core import engine

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True, index = True)
    username = Column(String, unique=True, index = True)
    email = Column(String)
    hashed_password = Column(String)


User.metadata.create_all(bind=engine)

class UserCreate(BaseModel):
    username: str
    password: str
