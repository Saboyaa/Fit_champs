"""create fit champs schema

Revision ID: ddb648a92c9c
Revises: 
Create Date: 2025-05-20 15:08:46.428435

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ddb648a92c9c'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("CREATE SCHEMA IF NOT EXISTS public;")


def downgrade() -> None:
    op.execute("DROP SCHEMA IF EXISTS public CASCADE;")
