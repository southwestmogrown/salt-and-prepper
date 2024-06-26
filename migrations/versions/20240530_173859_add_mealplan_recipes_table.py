"""add mealplan_recipes table

Revision ID: bf8746279dfb
Revises: 9cf112da5df8
Create Date: 2024-05-30 17:38:59.642701

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'bf8746279dfb'
down_revision = '9cf112da5df8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('mealplan_recipes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('mealplan_id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['mealplan_id'], ['mealplans.id'], ),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE mealplan_recipes SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('mealplan_recipes')
    # ### end Alembic commands ###
