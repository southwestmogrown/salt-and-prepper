from flask_wtf import FlaskForm
from wtforms import SelectField
from wtforms.validators import DataRequired


class AddRecipeToMealplanForm(FlaskForm):
    recipe_id = SelectField('Recipe Id', coerce=int)