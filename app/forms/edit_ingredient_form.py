from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class EditIngredientForm(FlaskForm):
    userId = IntegerField('userId')
    recipeId = IntegerField('recipeId')
    name = StringField('name', validators=[DataRequired(), Length(max=100)])
    type = StringField('type', validators=[DataRequired(), Length(max=20)])
    amount = StringField('amount', validators=[DataRequired(), Length(max=20)])