from datetime import date
from typing import List, Literal, Optional

from sqlalchemy import String, ForeignKey, UniqueConstraint, Index
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

type Gender = Literal["M", "F"]

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(50), unique=True)
    hashed_password: Mapped[str]
    city: Mapped[str] = mapped_column(String(50))
    sex: Mapped[Gender] = mapped_column(nullable=False)
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

class ChestRank(Base):
    __tablename__ = "rank_chest"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    username: Mapped[str] = mapped_column(String(50), nullable=False)
    age: Mapped[int] = mapped_column(nullable=False)
    sex: Mapped[str] = mapped_column(String(1), nullable=False)
    total_volume: Mapped[int] = mapped_column(nullable=False)

    __table_args__ = (
        Index("gender_age_rank_chest_idx", "sex", "age"),
    )
    __mapper_args__ = {"eager_defaults": False}

class BackRank(Base):
    __tablename__ = "rank_back"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    username: Mapped[str] = mapped_column(String(50), nullable=False)
    age: Mapped[int] = mapped_column(nullable=False)
    sex: Mapped[str] = mapped_column(String(1), nullable=False)
    total_volume: Mapped[int] = mapped_column(nullable=False)

    __table_args__ = (
        Index("gender_age_rank_back_idx", "sex", "age"),
    )
    __mapper_args__ = {"eager_defaults": False}

class ShoulderRank(Base):
    __tablename__ = "rank_shoulder"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    username: Mapped[str] = mapped_column(String(50), nullable=False)
    age: Mapped[int] = mapped_column(nullable=False)
    sex: Mapped[str] = mapped_column(String(1), nullable=False)
    total_volume: Mapped[int] = mapped_column(nullable=False)

    __table_args__ = (
        Index("gender_age_rank_shoulder_idx", "sex", "age"),
    )
    __mapper_args__ = {"eager_defaults": False}

class LegRank(Base):
    __tablename__ = "rank_leg"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    username: Mapped[str] = mapped_column(String(50), nullable=False)
    age: Mapped[int] = mapped_column(nullable=False)
    sex: Mapped[str] = mapped_column(String(1), nullable=False)
    total_volume: Mapped[int] = mapped_column(nullable=False)

    __table_args__ = (
        Index("gender_age_rank_leg_idx", "sex", "age"),
    )
    __mapper_args__ = {"eager_defaults": False}

class ArmRank(Base):
    __tablename__ = "rank_arm"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    username: Mapped[str] = mapped_column(String(50), nullable=False)
    age: Mapped[int] = mapped_column(nullable=False)
    sex: Mapped[str] = mapped_column(String(1), nullable=False)
    total_volume: Mapped[int] = mapped_column(nullable=False)

    __table_args__ = (
        Index("gender_age_rank_arm_idx", "sex", "age"),
    )
    __mapper_args__ = {"eager_defaults": False}

class GeneralRank(Base):
    __tablename__ = "general_rank"
    
    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    username: Mapped[str] = mapped_column(String(50), nullable=False)
    age: Mapped[int] = mapped_column(nullable=False)
    sex: Mapped[str] = mapped_column(String(1), nullable=False)
    positions: Mapped[float] = mapped_column(nullable=False)

    __table_args__ = (
        Index("gender_age_general_rank_idx", "sex", "age"),
    )
    __mapper_args__ = {"eager_defaults": False}