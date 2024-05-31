const SET_MEALPLAN = 'mealplan/SET_MEALPLAN';
const GET_MEALPLAN = 'mealplan/GET_MEALPLAN';
const ADD_MEALPLAN = 'mealplan/ADD_MEALPLAN';

const setMealplans = (mealplans) => ({
    type: SET_MEALPLAN,
    payload: mealplans
});

const getOneMealplan = (mealplan) => ({
    type: GET_MEALPLAN,
    payload: mealplan
});

const addOneMealplan = (mealplan) => ({
    type: ADD_MEALPLAN,
    payload: mealplan
});


export const getMealplans = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/mealplans`)

    if (res.ok) {
        const data = await res.json()

        if(data.errors) {
            return data.errors
        }
        dispatch(setMealplans(data))
    }

} 

export const getSingleMealplan = (userId, mealplanId) => async (dispatch) =>{
    const res = await fetch(`/api/users/${userId}/mealplans/${mealplanId}`)
    
    if (res.ok) {
        const data = await res.json()
        if(data.errors) {
            return data.errors
        }
        dispatch(getOneMealplan(data))
    }
}

export const addMealplan = (userId, name) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/mealplans`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            name
        })
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(addOneMealplan(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}

export const deleteMealplan = (userId, mealplanId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/mealplans/${mealplanId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = res.json();

        if(data.errors) {
            return data.errors
        }
        dispatch(setMealplans(data))
    }
}


const initialState = {allMealplans: null, oneMealplan: null}

export default function mealplanReducer(state = initialState, action) {
    switch(action.type) {
        case SET_MEALPLAN:
            return { ...state, allMealplans: action.payload}
        case GET_MEALPLAN:
            return { ...state, oneMealplan: action.payload}
        default:
            return state;
    }
}