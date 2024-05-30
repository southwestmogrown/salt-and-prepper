from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError


class RecipeForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=55)])
    type = StringField('type',validators=[DataRequired(), Length(max=10)])
    instructions = StringField('instructions', validators=[DataRequired()])