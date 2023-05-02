//reusable, chained curry function - the functions return from one to another
//first function receives the store object
//then returns another function that receives the next method
//next returns another function that receives the action
//then the middleware code/function
//this middleware function performs same actions as redux-logger/logger but unbundles logs
export const loggerMiddlewareRecreation = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState()); //shows value of the current state at that time

  next(action); //action hits middleware and Reducers, updates Reducers and store - once finished, following code will fire
  //because Reducers are called - all useSelector methods are called

  console.log("nextState: ", store.getState()); //shows the state after next finishes - requires next() before
};
