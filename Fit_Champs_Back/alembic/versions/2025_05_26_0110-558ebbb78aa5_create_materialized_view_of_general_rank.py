"""create materialized view of general rank

Revision ID: 558ebbb78aa5
Revises: dcccb276ef6a
Create Date: 2025-05-26 01:10:10.645057

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '558ebbb78aa5'
down_revision: Union[str, None] = 'dcccb276ef6a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE MATERIALIZED VIEW general_rank AS
        SELECT 
            sub.id,
            sub.username,
            sub.age,
            sub.sex,
            sub.total_volume * 
            GREATEST(sub.muscular_count / 5.0 + 1, 1) * 
            GREATEST(sub.date_count / 5.0 + 1, 1) AS positions
        FROM (
            SELECT 
                u.id,
                u.username,
                u.age,
                u.sex,
                COUNT(DISTINCT tr.muscular_group) AS muscular_count,
                COUNT(DISTINCT tr.train_date) AS date_count,
                SUM(te.volume) AS total_volume
            FROM users AS u
            JOIN (
                SELECT t.id, t.user_id, t.muscular_group, t.train_date
                FROM trains AS t
                WHERE t.train_date BETWEEN CURRENT_DATE - INTERVAL '7 days' AND CURRENT_DATE
            ) AS tr ON tr.user_id = u.id
            JOIN (
                SELECT 
                    tp.train_id,
                    tp.load * (
                        (regexp_split_to_array(tp.repetitions, 'x'))[1]::int *          
                        (regexp_split_to_array(tp.repetitions, 'x'))[2]::int
                    ) AS volume
                FROM trains_exercises AS tp 
                JOIN exercises AS e ON tp.exercise_id = e.id
            ) AS te ON te.train_id = tr.id
            GROUP BY u.id, u.username, u.age, u.sex
        ) AS sub;
               
        CREATE INDEX IF NOT EXISTS gender_age_general_rank_idx ON general_rank (sex, age)
    """)


def downgrade() -> None:
    op.execute("""
        DROP INDEX IF EXISTS gender_age_general_rank;
        DROP MATERIALIZED VIEW IF EXISTS general_rank;
    """)
