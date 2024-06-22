from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Mealplan
from app.forms import AddMealplanForm
from .user_routes import validation_errors_to_error_messages
from datetime import datetime


mealplan_routes = Blueprint('mealplans', __name__)

@mealplan_routes.route('', methods=["Post"])
@login_required
def add_mealplan():
  form = AddMealplanForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data

  if form.validate_on_submit():
      date_str = data['date'].split('T')[0]

      date_obj = datetime.strptime(date_str,"%Y-%m-%d")
      new_mealplan = Mealplan(
         user_id = current_user.id,
         name = data['name'],
         date = date_obj
      )

      db.session.add(new_mealplan)
      db.session.commit()
      return new_mealplan.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
