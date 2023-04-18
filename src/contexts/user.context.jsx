import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
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

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user)
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