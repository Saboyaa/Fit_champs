import datetime

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from ..database.core import engine

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(50), unique=True)
    hashed_password: Mapped[str]
    city: Mapped[str] = mapped_column(String(50))
    sex: Mapped[str] = mapped_column(String(9), nullable=False)
    age: Mapped[int] = mapped_column(nullable=False, default=10)
    phone: Mapped[str] = mapped_column(String(11))
    height: Mapped[int] = mapped_column(nullable=False, default=0)
    weight: Mapped[int] = mapped_column(nullable=False, default=0)
    rank_chest: Mapped[int] = mapped_column(nullable=False, default=0)
    rank_back: Mapped[int] = mapped_column(nullable=False, default=0)
    rank_leg: Mapped[int] = mapped_column(nullable=False, default=0)
    rank_shoulder: Mapped[int] = mapped_column(nullable=False, default=0)
    rank_arm: Mapped[int] = mapped_column(nullable=False, default=0)
    goal_chest: Mapped[int] = mapped_column(nullable=False, default=0)
    goal_back: Mapped[int] = mapped_column(nullable=False, default=0)
    goal_leg: Mapped[int] = mapped_column(nullable=False, default=0)
    goal_shoulder: Mapped[int] = mapped_column(nullable=False, default=0)
    goal_arm: Mapped[int] = mapped_column(nullable=False, default=0)

class Exercise(Base):
    __tablename__ = "exercises"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    repetitions: Mapped[str] = mapped_column(String(4), nullable=False, default="0x0")
    load: Mapped[int] = mapped_column(nullable=False, default=0)
    train_date: Mapped[datetime.date] = mapped_column(nullable=False)
    muscular_group: Mapped[str] = mapped_column(String(5), nullable=False)
    exercise: Mapped[str] = mapped_column(String(40), nullable=False)
