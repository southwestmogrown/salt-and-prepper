from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Recipe, db
from app.forms import RecipeForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/recipes')
@login_required
def recipes(id):
    recipes = Recipe.query.where(Recipe.user_id == id).all()
    return [recipe.to_dict() for recipe in recipes]

@user_routes.route('/<int:id>/recipes', methods=['POST'])
@login_required
def add_recipe(id):
    data = request.get_json()
    print(data)
    form = RecipeForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_recipe = Recipe(user_id=data['user_id'], name=data['name'], recipe_type=data['recipe_type'], instructions=data['instructions'])
        db.session.add(new_recipe)
        db.session.commit()
        recipes =  Recipe.query.where(id == Recipe.user_id).all()
        return {'recipes': [recipe.to_dict() for recipe in recipes]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401