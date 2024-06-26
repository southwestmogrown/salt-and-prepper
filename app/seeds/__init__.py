from flask.cli import AppGroup
from .users import seed_users, undo_users
from .recipes import seed_recipes, undo_recipes
from .ingredients import seed_ingredients, undo_ingredients
from .mealplans import seed_mealplans, undo_mealplans
from .mealplan_recipes import seed_mealplan_recipes, undo_mealplan_recipes

from app.models.db import environment

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_mealplan_recipes()
        undo_mealplans()
        undo_ingredients()
        undo_recipes()
        undo_users()
    seed_users()
    seed_recipes()
    seed_ingredients()
    seed_mealplans()
    seed_mealplan_recipes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_mealplan_recipes()
    undo_mealplans()
    undo_ingredients()
    undo_recipes()
    undo_users()
    # Add other undo functions here
