//User Reducer - code was largely copied/transported from user.context.js

import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

//Reducer function
export const userReducer = (state = INITIAL_STATE, action) => {
    //state given default value
  const { type, payload } = action;

  switch( type ) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      }
    default:
      return state;
  }
};

export default userReducer;