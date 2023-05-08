import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// import { loggerMiddlewareRecreation } from "./middleware/logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"], //blacklist because user state is being handled by AuthStateListener
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
//Persist's way of combining Reducers - passed config and Reducer to persist State

// const middleWares = [logger];  //removed upon addition of loggerMiddlewareRecreation
//middleWares are store enhancer - logger serving as enhancer
//there are several enhancers - middleWare is just the primary one used

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  // process.env.NODE_ENV !== "production" && loggerMiddlewareRecreation,
  // thunk,
  sagaMiddleware,
].filter(Boolean);
//only render logger if the App environment is not in production (dev env)
//using .filter returns empty array if returns false - returns loggerMiddlewareRecreation if true

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
//if not in production //and there is a window object //and that window object has Redux DevTools method
// use DevTools Compose - otherwise, just use Redux Compose

// const composedEnhancers = compose(applyMiddleware(...middleWares));  //replaced with composeEnhancer
//compose composes single-argument functions - last function can take multiple arguments
//compose(f, g, h) is identical to doing (...args) => f(g(h(...args))).
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// export const store = createStore(rootReducer, undefined, composedEnhancers);
//Root Reducer - combination of all Reducers
//note: createStore is not actually deprecated - just a warning that this process could be easier

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
