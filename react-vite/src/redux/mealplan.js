const LOAD_MEALPLANS = "mealplan/LOAD_MEALPLANS";
const GET_MEALPLAN = "mealplan/GET_MEALPLAN";
const ADD_MEALPLAN = "mealplan/ADD_MEALPLAN";

const loadMealplans = (mealplans) => ({
  type: LOAD_MEALPLANS,
  payload: mealplans,
});

const getOneMealplan = (mealplan) => ({
  type: GET_MEALPLAN,
  payload: mealplan,
});

const addOneMealplan = (mealplan) => ({
  type: ADD_MEALPLAN,
  payload: mealplan,
});

export const thunkLoadMealplans = () => async (dispatch) => {
  const res = await fetch(`/api/users/mealplans`);

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return data.errors;
    }
    dispatch(loadMealplans(data));
  }
};

export const getSingleMealplan = (userId, mealplanId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/mealplans/${mealplanId}`);

  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
    dispatch(getOneMealplan(data));
  }
};

export const thunkAddMealplan = (name, date) => async (dispatch) => {
  const res = await fetch(`/api/mealplans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      date: date,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addOneMealplan(data));
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkDeleteMealplan = (mealplanId) => async (dispatch) => {
  const res = await fetch(`/api/mealplans/${mealplanId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = res.json();

    if (data.errors) {
      return data.errors;
    }
    dispatch(loadMealplans(data));
  }
};

const initialState = { plans: [], oneMealplan: null };

export default function mealplanReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MEALPLANS:
      return { ...state, plans: action.payload };
    case ADD_MEALPLAN:
      return { ...state, plans: [...state.plans, action.payload] };
    case GET_MEALPLAN:
      return { ...state, oneMealplan: action.payload };
    default:
      return state;
  }
}
