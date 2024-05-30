from .db import db, environment, SCHEMA, add_prefix_for_prod

class MealplanRecipe(db.Model):
    __tablename__ = 'mealplan_recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    mealplan_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('mealplans.id')), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)

    mealplan = db.relationship('Mealplan', back_populates='mp_recipes')
    recipes = db.relationship('Recipe', back_populates='mealplanrecipe')

    def to_dict(self):
        return {
            'id': self.id,
            'mealplanId': self.mealplan_id,
            'recipeId': self.recipe_id
        }