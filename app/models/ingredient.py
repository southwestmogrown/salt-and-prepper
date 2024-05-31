from .db import db, environment, SCHEMA, add_prefix_for_prod

class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    ingredient_type = db.Column(db.String(20), nullable=True)
    measurement = db.Column(db.String(20), nullable=True)

    recipe = db.relationship('Recipe', back_populates='ingredients')

    def to_dict(self):
        return {
            'id': self.id,
            'recipeId': self.recipe_id,
            'name': self.name,
            'ingredientType': self.ingredient_type,
            'measurement': self.measurement
        }