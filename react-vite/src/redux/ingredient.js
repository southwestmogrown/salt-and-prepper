const SET_INGREDIENT = 'ingredient/SET_INGREDIENT';
const GET_INGREDIENT = 'ingredient/GET_INGREDIENT';
const UPDATE_INGREDIENT = 'ingredient/UPDATE_INGREDIENT';
const ADD_INGREDIENT = 'ingredient/ADD_INGREDIENT';

const setIngredients = (ingredients) => ({
    type: SET_INGREDIENT,
    payload: ingredients
});

const getOneIngredient = (ingredient) => ({
    type: GET_INGREDIENT,
    payload: ingredient   
});

const updateOneIngredient = (name, type, amount) => ({
    type: UPDATE_INGREDIENT,
    payload: {
        name,
        type,
        amount
    }
});

const addOneIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    payload: ingredient
});

export const getIngredients = (userId, recipeId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/recipes/${recipeId}/ingredients`)

    if(res.ok) {
        const data = await res.json()

        if(data.errors) {
            return data.errors
        }
        dispatch(setIngredients(data))
    }
}

export const getSingleIngredient = (userId, recipeId, ingredientId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/recipes/${recipeId}/ingredients/${ingredientId}`)

    if(res.ok) {
        const data = await res.json()

        if(data.errors) {
            return data.errors
        }
        dispatch(getOneIngredient(data))
    }
}

export const addIngredient = (userId, recipeId, name, type, amount) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/recipes/${recipeId}/ingredients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            recipeId,
            name,
            type,
            amount
        })
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(addOneIngredient(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}

export const updateIngredient = (userId, recipeId, ingredientId, name, type, amount) => async (dispatch) => {
    
    const res = await fetch(`/api/users/${userId}/recipes/${recipeId}/ingredients/${ingredientId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            type,
            amount
        })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(updateOneIngredient(data.name, data.type, data.amount))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}

export const deleteIngredient = (userId, recipeId, ingredientId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/recipes/${recipeId}/ingredients/${ingredientId}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        const data = await res.json()

        if(data.errors) {
            return data.errors
        }
    }
    dispatch(setIngredients)
}


const initialState = {allIngredients: null, oneIngredient: null}

export default function ingredientReducer(state = initialState, action) {
    switch(action.type) {
        case SET_INGREDIENT:
            return { ...state, allIngredients: action.payload}
        case GET_INGREDIENT:
            return { ...state, oneIngredient: action.payload}
        case ADD_INGREDIENT:
            return { ...state, oneIngredient: action.payload}
        case UPDATE_INGREDIENT:
            return { ...state, oneIngredient: action.payload}
        default:
            return state;
    }
}