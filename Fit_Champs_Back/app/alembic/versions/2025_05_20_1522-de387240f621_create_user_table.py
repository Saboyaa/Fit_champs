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
        CREATE DOMAIN gender AS VARCHAR(1)
        CHECK (
            VALUE = 'M'
            OR VALUE = 'F'
        );
               
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50),
            email VARCHAR(50) UNIQUE,
            hashed_password VARCHAR,
            city VARCHAR(50),
            sex gender NOT NULL,
            age SMALLINT NOT NULL DEFAULT 10 CHECK(age >= 10),
            phone VARCHAR(11),
            height SMALLINT NOT NULL DEFAULT 0 CHECK(height >= 0),
            weight SMALLINT NOT NULL DEFAULT 0 CHECK(weight >= 0),
            rank_chest INT NOT NULL DEFAULT 0 CHECK(rank_chest >= 0),
            rank_back INT NOT NULL DEFAULT 0 CHECK(rank_back >= 0),
            rank_leg INT NOT NULL DEFAULT 0 CHECK(rank_leg >= 0),
            rank_shoulder INT NOT NULL DEFAULT 0 CHECK(rank_shoulder >= 0),
            rank_arm INT NOT NULL DEFAULT 0 CHECK(rank_arm >= 0),
            rank_general INT NOT NULL DEFAULT 0 CHECK(rank_general >= 0),
            goal_chest SMALLINT NOT NULL DEFAULT 3500 CHECK(goal_chest >= 0),
            goal_back SMALLINT NOT NULL DEFAULT 3400 CHECK(goal_back >= 0),
            goal_leg SMALLINT NOT NULL DEFAULT 4500 CHECK(goal_leg >= 0),
            goal_shoulder SMALLINT NOT NULL DEFAULT 2300 CHECK(goal_shoulder >= 0),
            goal_arm SMALLINT NOT NULL DEFAULT 2100 CHECK(goal_arm >= 0)
        );
    """)

def downgrade() -> None:
    op.execute("""
        DROP TABLE IF EXISTS users CASCADE;
        DROP DOMAIN IF EXISTS gender;
    """)
