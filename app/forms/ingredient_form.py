from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class IngredientForm(FlaskForm):
    userId = IntegerField('userId')
    recipeId = IntegerField('recipeId')
    name = StringField('name', validators=[DataRequired(), Length(max=100)])
    ingredient_type = StringField('ingredient_type', validators=[DataRequired(), Length(max=20)])
    amount = StringField('amount', validators=[DataRequired(), Length(max=20)])