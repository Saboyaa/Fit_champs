"""create train and trains_exercises tables

Revision ID: 9bf6ab7425cf
Revises: c0de6d5bb8d0
Create Date: 2025-05-25 15:09:31.612215

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9bf6ab7425cf'
down_revision: Union[str, None] = 'c0de6d5bb8d0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE trains (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            muscular_group VARCHAR(10) NOT NULL,
            train_date DATE NOT NULL,
            CONSTRAINT uq_user_date_group UNIQUE (user_id, train_date, muscular_group)
        );

        CREATE TABLE trains_exercises (
            id SERIAL PRIMARY KEY,
            train_id INTEGER REFERENCES trains(id),
            exercise_id INTEGER REFERENCES exercises(id),
            repetitions VARCHAR(4),
            load INTEGER CHECK(load >= 0)
        );
               
        CREATE INDEX IF NOT EXISTS trains_user_id_idx ON trains USING btree (user_id);
    """)


def downgrade() -> None:
    op.execute("""
        DROP INDEX IF EXISTS trains_user_id_idx;
        DROP TABLE IF EXISTS trains_exercises;
        DROP TABLE IF EXISTS trains;
    """)
