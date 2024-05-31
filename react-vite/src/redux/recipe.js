const SET_RECIPE = 'recipe/SET_RECIPE';
const GET_RECIPE = 'recipe/GET_RECIPE';
const UPDATE_RECIPE = 'recipe/UPDATE_RECIPE';
const ADD_RECIPE = 'recipe/ADD_RECIPE';

const setRecipes = (recipes) => ({
    type: SET_RECIPE,
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

const addOneRecipe = (recipes) => ({
    type: ADD_RECIPE,
    recipes
});

export const thunkGetRecipes = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/recipes`)

    if(res.ok) {
        const data = await res.json()
        if(data.errors) {
            return data.errors
        }
        dispatch(setRecipes(data))
        return data
    }
};

export const getRecipe = (userId, recipeId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/recipes/${recipeId}`)

    if(res.ok) {
        const data = await res.json()
        if(data.errors) {
            return data.errors
        }
        dispatch(getOneRecipe(data))
    }
}

export const thunkAddRecipe = ({user_id, name, recipe_type, instructions}) => async (dispatch) => {
    const res = await fetch(`/api/users/${user_id}/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            name,
            recipe_type,
            instructions
        })
    });

    if(res.ok) {
        const data = await res.json();
        dispatch(addOneRecipe(data.recipes));
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

        dispatch(setRecipes(data))
    }


}

const initialState = {allRecipes: [], oneRecipe: null}

export default function recipeReducer(state = initialState, action) {
    switch(action.type) {
        case SET_RECIPE:
            console.log(action.recipes)
            return { ...state, allRecipes: [...action.recipes]}
        case ADD_RECIPE:
            return { ...state, allRecipes: [...action.recipes]}
        case GET_RECIPE:
            return { ...state, oneRecipe: action.payload}
        case UPDATE_RECIPE:
            return { ...state, oneRecipe: action.payload}
        default:
            return state;
    }
}