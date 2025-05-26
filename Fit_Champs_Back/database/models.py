from datetime import date
from typing import List, Optional

from sqlalchemy import String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(50), unique=True)
    hashed_password: Mapped[str]
    city: Mapped[str] = mapped_column(String(50))
    sex: Mapped[str] = mapped_column(String(1), nullable=False)
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
    muscular_group: Mapped[Optional[str]] = mapped_column(String(10), index=True)
    exercise_name: Mapped[Optional[str]] = mapped_column(String(30))
    submuscular_group: Mapped[Optional[str]] = mapped_column(String(30))

class TrainExercise(Base):
    __tablename__ = "trains_exercises"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    train_id: Mapped[int] = mapped_column(ForeignKey("trains.id"))
    exercise_id: Mapped[int] = mapped_column(ForeignKey("exercises.id"))
    repetitions: Mapped[str] = mapped_column(nullable=False)
    load: Mapped[int] = mapped_column(nullable=False)
    train: Mapped["Train"] = relationship(
        back_populates="exercises"
    )
    exercise: Mapped["Exercise"] = relationship()

class Train(Base):
    __tablename__ = "trains"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    muscular_group: Mapped[str] = mapped_column(String(10))
    train_date: Mapped[date] = mapped_column(nullable=False)
    exercises: Mapped[List["TrainExercise"]] = relationship(
        back_populates="train"
    )

    __table_args__ = (
        UniqueConstraint("user_id", "train_date", "muscular_group", name="uq_user_date_group"),
    )
