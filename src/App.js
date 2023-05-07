import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
//   getCurrentUser,
// } from "./utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";
// import { setCurrentUser } from "./store/user/user.action";
// import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  //useEffect() copied from old user.context
  //commented out as functionality has been moved to firebase.utils
  // useEffect(() => {
  // const unsubscribe = onAuthStateChangedListener((user) => {
  //   if (user) {
  //     createUserDocumentFromAuth(user);
  //   }
  //   dispatch(setCurrentUser(user)); //initiating Store state change with dispatch
  // })
  // return unsubscribe;
  // }, [dispatch]);   //dispatch is not needed here as it does not change - linter requires it

  useEffect(() => {
    // getCurrentUser().then((user) => console.log(user));
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
