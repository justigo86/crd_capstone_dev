import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
  //final Reducer by combining Reducers

export const rootReducer = combineReducers({
  user: userReducer
})