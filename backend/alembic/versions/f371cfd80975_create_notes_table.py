"""create notes table

Revision ID: f371cfd80975
Revises: 
Create Date: 2026-05-05 12:52:45.775187

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f371cfd80975'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        "notes",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("text", sa.String),
        sa.Column("completed", sa.Boolean)
    )


def downgrade():
    op.drop_table("notes")

"""
def upgrade() -> None:
    #Upgrade
    pass


def downgrade() -> None:
    #Downgrade
    pass

"""
