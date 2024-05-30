from app.models import db, Mealplan, environment, SCHEMA
from sqlalchemy.sql import text

def seed_mealplans():
    mp1 = Mealplan(user_id=1, name='mealplan 1')

    mp2 = Mealplan(user_id=1, name='mealplan 2')

    mp3 = Mealplan(user_id=2, name='mealplan 3')

    db.session.add(mp1)
    db.session.add(mp2)
    db.session.add(mp3)

    db.session.commit()

def undo_mealplans():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.mealplans RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM mealplans"))
        
    db.session.commit()