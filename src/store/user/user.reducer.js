//User Reducer - code was largely copied/transported from user.context.js

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

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