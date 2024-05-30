from app.models import db, Ingredient, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_ingredients():
    i1 = Ingredient(
        recipe_id=1,
        name='Tortillas', 
        ingredient_type='Starch/Bread', 
        measurement='30',
    )
    i2 = Ingredient(
        recipe_id=1,
        name='Meat', 
        ingredient_type='Protien', 
        measurement='2 lbs',
    )
    i3 = Ingredient(
        recipe_id=1,
        name='Cheese', 
        ingredient_type='Dairy', 
        measurement='24 oz',
    )

    db.session.add(i1)
    db.session.add(i2)
    db.session.add(i3)

    db.session.commit()



def undo_ingredients():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ingredients"))
        
    db.session.commit()