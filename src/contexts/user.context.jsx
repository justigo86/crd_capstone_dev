import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
//Context serves as external storage to send/fetch data/state throughout an app without using props

//create the context here
export const UserContext = createContext({
  //default values for the variables created below
  currentUser: null,
  setCurrentUser: () => null,
});

//[after Context established - decided to implement Reducers]
//Reducer type object
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
}
//Reducer function
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch( type ) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      }
    default:
      throw new Error(`Unknown userReducer type: ${type}.`);
  }
}

const INITIAL_STATE = {
  currentUser: null,
}

//alias for UserContext.Provider - to be used in index.js to wrap around components & use throughout app
//by wrapping it around <App /> - will be able to use with App and all children components
export const UserProvider = ({ children }) => {
  //[after Reducer implemented]
  // const [currentUser, setCurrentUser] = useState(null);  //useState and Context now being set by Reducer

  //Reducer state management
  
  const [ state, dispatch ] = useReducer( userReducer, INITIAL_STATE );
  const { currentUser } = state;
  const setCurrentUser = (user) => {
    dispatch({
      type: USER_ACTION_TYPES.SET_CURRENT_USER,
      payload: user,
    })
  }

  //useEffect largely uses functionality previously used in sign-in/up forms
  useEffect(() => {   //used to mount onAuthStateChangedListener on component mount (for any auth component)
    //the function returned by onAuthStateChangedListener is being assigned to unsubscribe
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user)
        //if the user signs out, we store null - they sign in, we store the user object
    })

    return unsubscribe;
  }, []);

  const value = { currentUser };  //using in order to call both the setter and the value

  return (
    <UserContext.Provider value={value}>
      {/* value holds the contextual value */}
      {children}
    </UserContext.Provider>
  )
}