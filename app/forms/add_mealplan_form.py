from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class AddMealplanForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=55)])
    userId = IntegerField('userId')