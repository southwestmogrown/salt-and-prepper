from .db import db, environment, SCHEMA, add_prefix_for_prod

class Recipe(db.Model):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    recipe_type = db.Column(db.String(10))
    instructions = db.Column(db.Text, nullable=False)
    
    user = db.relationship('User', back_populates='recipes')
    ingredients = db.relationship('Ingredient', back_populates='recipe',  cascade="all, delete-orphan")
    mealplanrecipe = db.relationship('MealplanRecipe', back_populates='recipes', cascade="all, delete-orphan")
    

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            'recipe_type': self.recipe_type,
            'instructions': self.instructions
        }