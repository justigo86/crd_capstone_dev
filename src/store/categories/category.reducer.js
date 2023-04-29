import CATEGORIES_ACTION_TYPES from "./category.types";

const CATEGORIES_INITIAL_STATE = {
  // updated to an array upon changing data pulled by Reducer (firebase.utils) array
  categories: [],
};

//Reducer function
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch( type ) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      }
    default:
      return state;
  }
};