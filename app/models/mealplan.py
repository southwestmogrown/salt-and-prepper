from .db import db, environment, SCHEMA, add_prefix_for_prod

class Mealplan(db.Model):
    """Table to connect recipes to users"""

    __tablename__ = 'mealplans'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.Date, nullable=False)

    user = db.relationship('User', back_populates='user_mealplans')
    mp_recipes = db.relationship('MealplanRecipe', back_populates='mealplan', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'userId': self.user_id,
            'date': self.date
        }