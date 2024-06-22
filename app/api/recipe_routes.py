from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Recipe, db
from app.forms import RecipeForm
from .user_routes import validation_errors_to_error_messages

recipe_routes = Blueprint('recipes', __name__)

@recipe_routes.route('', methods=['POST'])
@login_required
def add_recipe():
    form = RecipeForm()
    data = form.data

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_recipe = Recipe(
                              user_id=current_user.id, 
                              name=data['name'], 
                              recipe_type=data['recipe_type'], 
                              instructions=data['instructions'], 
                              description=data['description']
                           )
        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@recipe_routes.route('/<int:recipeId>', methods=['DELETE'])
@login_required
def delete_recipe(recipeId):
    
    recipe = Recipe.query.get(recipeId)
    db.session.delete(recipe)
    db.session.commit()
    recipes = Recipe.query.where(Recipe.user_id == current_user.id).all()
    return [recipe.to_dict() for recipe in recipes]


@recipe_routes.route('/<int:recipeId>', methods=['POST'])
@login_required
def edit_recipe(recipeId):
    form = RecipeForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        recipe = Recipe.query.get(recipeId)
        recipe.name = form.data['name']
        recipe.recipe_type = form.data['recipe_type']
        recipe.description = form.data['description']
        recipe.instructions = form.data['instructions']
        db.session.commit()


        return recipe.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401