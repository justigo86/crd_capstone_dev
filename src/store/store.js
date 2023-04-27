import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const middleWares = [logger];
//middleWares are store enhancer - logger serving as enhancer
  //there are several enhancers - middleWare is just the primary one used

const composedEnhancers = compose(applyMiddleware(...middleWares));
//compose composes single-argument functions - last function can take multiple arguments
  //compose(f, g, h) is identical to doing (...args) => f(g(h(...args))).

//Root Reducer - combination of all Reducers
export const store = createStore(rootReducer, undefined, composedEnhancers);
    //note: not actually deprecated - just a warning that this process could be easier