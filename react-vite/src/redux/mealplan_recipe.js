const SET_MEALPLANRECIPES = 'mealplan/SET_MEALPLANRECIPES';
const ADD_MEALPLANRECIPES = 'mealplan/ADD_MEALPLANRECIPES';
const GET_MEALPLANRECIPE = 'mealplan/GET_MEALPLANRECIPE';
const SET_MEALPLANRECIPEIDS = 'mealplan/SET_MEALPLANRECIPEIDS'

const setMealPlanRecipes = (mealplan_recipes) => ({
    type: SET_MEALPLANRECIPES,
    payload: mealplan_recipes
});

const getMealPlanRecipe = (mealplan_recipe) => ({
    type: GET_MEALPLANRECIPE,
    payload: mealplan_recipe
});

const addMealPlanRecipe = (recipe) => ({
    type: ADD_MEALPLANRECIPES,
    payload: recipe
});

const getMealplanRecipeIds = (mealplan_recipe_ids) => ({
    type: SET_MEALPLANRECIPEIDS,
    payload: mealplan_recipe_ids
})

export const getMealPlanRecipes = (userId, mealplanId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/mealplans/${mealplanId}/mealplan-recipes`)

    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(setMealPlanRecipes(data))
    }
}

export const getAllMealplanRecipeIds = (userId, mealplanId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/mealplans/${mealplanId}/mealplan-recipe-ids`)

    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(getMealplanRecipeIds(data))
    }
}


export const getOneMealPlanRecipe = (userId, mealplanId, recipeId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/mealplans/${mealplanId}/mealplan-recipes/${recipeId}`)

    if (res.ok) {
        const data = await res.json()
        
        if (data.errors) {
            return data.errors
        }
        dispatch(getMealPlanRecipe(data))
    }
}



export const addOneRecipe = (userId, mealplanId, recipeId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/mealplans/${mealplanId}/mealplan-recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mealplanId,
            recipeId
        })
    });

    if (res.ok) {
        const data = await res.json();
        console.log(data)
        dispatch(addMealPlanRecipe(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}

export const deleteMealplanRecipe = (userId, mealplanId, mealplanRecipeId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/mealplans/${mealplanId}/mealplan-recipes/${mealplanRecipeId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const data = res.json()

        if (data.errors) {
            return data.errors
        }
        dispatch(setMealPlanRecipes(data))
    }

}

const initialState = {allMealplanRecipes: null, oneMealPlanRecipe: null, mealplanRecipeIds: null}

export default function mealplanRecipeReducer(state = initialState, action) {
    switch(action.type) {
        case SET_MEALPLANRECIPES:
            return {...state, allMealplanRecipes: action.payload}
        case GET_MEALPLANRECIPE:
            return {...state, oneMealPlanRecipe: action.payload}
        case SET_MEALPLANRECIPEIDS:
            return {...state, mealplanRecipeIds: action.payload }
        default:
            return state
    }
}