import CATEGORIES_ACTION_TYPES from "./category.types";

const CATEGORIES_INITIAL_STATE = {
  // updated to an array upon changing data pulled by Reducer (firebase.utils) array
  categories: [],
  isLoading: false,
  error: null,
};

//Reducer function
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    // case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:   //replaced with FETCH
    //   return {
    //     ...state,
    //     categories: payload,
    //   };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: payload,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
