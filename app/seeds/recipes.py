from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_recipes():
    r1 = Recipe(
        user_id=1,
        name='Enchiladas', 
        recipe_type='Dinner', 
        instructions='Nulla porttitor accumsan tincidunt. Proin eget tortor risus. Donec sollicitudin molestie malesuada. Curabitur aliquet quam id dui posuere blandit. Donec sollicitudin molestie malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.',
        description='This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
    )
    r2 = Recipe(
        user_id=2,
        name='Grilled Cheese', 
        recipe_type='Lunch', 
        instructions='Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.',
        description='This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
    )
    r3 = Recipe(
        user_id=3,
        name='Pancakes', 
        recipe_type='Breakfast', 
        instructions='Donec rutrum congue leo eget malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.',    
        description='This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
    )



    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))
        
    db.session.commit()