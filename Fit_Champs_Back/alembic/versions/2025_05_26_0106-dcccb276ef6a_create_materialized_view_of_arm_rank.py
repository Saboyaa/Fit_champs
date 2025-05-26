"""create materialized view of arm rank

Revision ID: dcccb276ef6a
Revises: 11473e02bd6c
Create Date: 2025-05-26 01:06:44.703160

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dcccb276ef6a'
down_revision: Union[str, None] = '11473e02bd6c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE MATERIALIZED VIEW rank_arm AS
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
            WHERE e.muscular_group='Braço'
        ) AS tpe ON tpe.train_id = t.id
        GROUP BY u.id;
               
        CREATE INDEX IF NOT EXISTS gender_age_rank_arm_idx ON rank_arm (sex, age);
    """)


def downgrade() -> None:
    op.execute("""
        DROP INDEX IF EXISTS gender_age_rank_arm_idx;
        DROP MATERIALIZED VIEW IF EXISTS rank_arm;
    """)
