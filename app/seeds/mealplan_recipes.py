from app.models import db, MealplanRecipe, environment, SCHEMA
from sqlalchemy.sql import text


def seed_mealplan_recipes():

    mpr1 = MealplanRecipe(
        mealplan_id = 1,
        recipe_id = 1
    )

    mpr2 = MealplanRecipe(
        mealplan_id = 1,
        recipe_id = 2
    )

    mpr3 = MealplanRecipe(
        mealplan_id = 1,
        recipe_id = 3
    )

    db.session.add(mpr1)
    db.session.add(mpr2)
    db.session.add(mpr3)

    db.session.commit()

def undo_mealplan_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.mealplan_recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM mealplan_recipes"))
        
    db.session.commit()