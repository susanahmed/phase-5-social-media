"""tables

Revision ID: 473cfdf19b01
Revises: 72aecc34d7d0
Create Date: 2023-04-04 09:52:49.636810

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '473cfdf19b01'
down_revision = '72aecc34d7d0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('songs')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('songs',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('title', sa.VARCHAR(), nullable=False),
    sa.Column('artist', sa.VARCHAR(), nullable=False),
    sa.Column('genre', sa.VARCHAR(), nullable=False),
    sa.Column('url', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('users')
    # ### end Alembic commands ###