from sqlalchemy import Column, Integer, String
from pydantic import BaseModel, Field, PositiveInt

from ..database.core import Base
from ..database.core import engine

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True, index = True)
    username = Column(String, unique=True, index = True)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    city = Column(String)
    sex = Column(String(9))
    age = Column(Integer)
    phone = Column(String(11))
    height = Column(Integer)
    weight = Column(Integer)
    rank_chest = Column(Integer, default=None, nullable=True)
    rank_back = Column(Integer, default=None, nullable=True)
    rank_leg = Column(Integer, default=None, nullable=True)
    rank_shoulder = Column(Integer, default=None, nullable=True)
    rank_arm = Column(Integer, default=None, nullable=True)
    goal_chest = Column(Integer, default=None, nullable=True)
    goal_back = Column(Integer, default=None, nullable=True)
    goal_lef = Column(Integer, default=None, nullable=True)
    goal_shoulder = Column(Integer, default=None, nullable=True)
    goal_arm = Column(Integer, default=None, nullable=True)


User.metadata.create_all(bind=engine)

class UserDataUpdate(BaseModel):
    token: str
    username: str
    email: str
    city: str
    age: PositiveInt
    phone: str = Field(pattern=r'\d{11}')
    height: PositiveInt
    weight: PositiveInt

class UserGoalUpdate(BaseModel):
    token: str
    goal: int