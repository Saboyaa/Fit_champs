"""create materialized view of chest rank

Revision ID: fca81da9a52e
Revises: 9bf6ab7425cf
Create Date: 2025-05-26 01:00:07.643251

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fca81da9a52e'
down_revision: Union[str, None] = '9bf6ab7425cf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE MATERIALIZED VIEW rank_chest AS
        SELECT 
            u.id,
            u.username,
            u.age,
            u.sex,
            SUM(tpe.volume) AS total_volume
        FROM users AS u
        JOIN (
            SELECT t.id, t.user_id
            FROM trains AS t
            WHERE t.train_date BETWEEN CURRENT_DATE - INTERVAL '7 days' AND CURRENT_DATE
        ) AS t ON t.user_id = u.id
        JOIN (
            SELECT 
                tp.train_id,
                tp.load * (
                    (regexp_split_to_array(repetitions, 'x'))[1]::int *          
                    (regexp_split_to_array(repetitions, 'x'))[2]::int
                ) AS volume
            FROM trains_exercises AS tp 
            JOIN exercises AS e ON tp.exercise_id=e.id
            WHERE e.muscular_group='Peito'
        ) AS tpe ON tpe.train_id = t.id
        GROUP BY u.id;
               
        CREATE INDEX IF NOT EXISTS gender_age_rank_chest_idx ON rank_chest (sex, age);
    """)


def downgrade() -> None:
    op.execute("""
        DROP INDEX IF EXISTS gender_age_rank_chest_idx;
        DROP MATERIALIZED VIEW IF EXISTS rank_chest;
    """)
