import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
//Context serves as external storage to send/fetch data/state throughout an app without using props

//create the context here
export const UserContext = createContext({
  //default values for the variables created below
  currentUser: null,
  setCurrentUser: () => null,
});

//alias for UserContext.Provider - to be used in index.js to wrap around components & use throughout app
//by wrapping it around <App /> - will be able to use with App and all children components
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };  //using in order to call both the setter and the value

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
  }, [])

  return (
    <UserContext.Provider value={value}>
      {/* value holds the contextual value */}
      {children}
    </UserContext.Provider>
  )
}