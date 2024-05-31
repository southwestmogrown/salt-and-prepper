const LOAD_RECIPES = 'recipe/LOAD_RECIPES';
const GET_RECIPE = 'recipe/GET_RECIPE';
const UPDATE_RECIPE = 'recipe/UPDATE_RECIPE';
const ADD_RECIPE = 'recipe/ADD_RECIPE';

const loadRecipes = (recipes) => ({
    type: LOAD_RECIPES,
    recipes
});

const getOneRecipe = (recipe) => ({
    type: GET_RECIPE,
    payload: recipe
});

const updateOneRecipe = (instructions) => ({
    type: UPDATE_RECIPE,
    payload: {
        instructions
    }
});

const addOneRecipe = (recipe) => ({
    type: ADD_RECIPE,
    recipe
});

export const thunkGetRecipes = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/recipes`)

    if(res.ok) {
        const data = await res.json()
        if(data.errors) {
            return data.errors
        }
        const payload = {}
        data.forEach(recipe => {
            payload[recipe.id] = recipe
        })
        dispatch(loadRecipes(payload))
    }
};

export const thunkGetRecipe = (userId, recipeId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/recipes/${recipeId}`)

    if(res.ok) {
        const data = await res.json()
        if(data.errors) {
            return data.errors
        }
        dispatch(getOneRecipe(data))
    }
}

export const thunkAddRecipe = ({user_id, name, recipe_type, instructions, description}) => async (dispatch) => {
    const res = await fetch(`/api/users/${user_id}/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            name,
            recipe_type,
            instructions,
            description
        })
    });

    if(res.ok) {
        const data = await res.json();
        dispatch(addOneRecipe(data));
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
} 

export const updateRecipe = (userId, recipeId, instructions) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/recipes/${recipeId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            instructions: instructions
        })
    });
    
    if (res.ok) {
        const data = await res.json();
        dispatch(updateOneRecipe(data.instructions))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}

export const deleteRecipe = (userId, recipeId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/recipes/${recipeId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const data = await res.json()

        if(data.errors) {
            return data.errors
        }

        dispatch(loadRecipes(data))
    }


}

const initialState = {}

export default function recipeReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_RECIPES:
            return { ...action.recipes }
        case ADD_RECIPE:
            return { ...state, [action.recipe.id]: action.recipe }
        case GET_RECIPE:
            return { ...state, oneRecipe: action.payload}
        case UPDATE_RECIPE:
            return { ...state, oneRecipe: action.payload}
        default:
            return state;
    }
}