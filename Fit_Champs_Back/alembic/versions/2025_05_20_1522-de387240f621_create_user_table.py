"""create users table

Revision ID: de387240f621
Revises: 
Create Date: 2025-05-20 15:22:14.815992

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'de387240f621'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE DOMAIN gender AS VARCHAR(9)
        CHECK (
            VALUE = 'Masculino'
            OR VALUE = 'Feminino'
        );
               
        CREATE TABLE users (
            id SERIAL,
            username VARCHAR(50) UNIQUE,
            email VARCHAR(50) UNIQUE,
            hashed_password VARCHAR,
            city VARCHAR(50),
            sex gender NOT NULL,
            age INT CHECK(age >= 10) DEFAULT 10,
            phone VARCHAR(11),
            height INT CHECK(height >= 0) DEFAULT 0,
            weight INT CHECK(weight >= 0) DEFAULT 0,
            rank_chest INT CHECK(rank_chest >= 0) DEFAULT 0,
            rank_back INT CHECK(rank_back >= 0) DEFAULT 0, 
            rank_leg INT CHECK(rank_leg >= 0) DEFAULT 0,
            rank_shoulder INT CHECK(rank_shoulder >= 0) DEFAULT 0,
            rank_arm INT CHECK(rank_arm >= 0) DEFAULT 0,
            goal_chest INT CHECK(goal_chest >= 0) DEFAULT 0,
            goal_back INT CHECK(goal_back >= 0) DEFAULT 0,
            goal_leg INT CHECK(goal_leg >= 0) DEFAULT 0,
            goal_shoulder INT CHECK(goal_shoulder >= 0) DEFAULT 0,
            goal_arm INT CHECK(goal_arm >= 0) DEFAULT 0
        );
    """)


def downgrade() -> None:
    op.execute("""
        DROP TABLE IF EXISTS users CASCADE;
        DROP DOMAIN IF EXISTS gender;
    """)
