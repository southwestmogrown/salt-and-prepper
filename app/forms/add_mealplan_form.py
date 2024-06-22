from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeLocalField
from wtforms.validators import DataRequired, Length

class AddMealplanForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=55)])
    date = StringField('date', validators=[DataRequired()])