import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
// import { useContext } from "react";
// import { UserContext } from "../../contexts/user.context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useDispatch, useSelector } from "react-redux";
// import { CartContext } from "../../contexts/cart.context";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch();
  // const { currentUser } = useContext(UserContext); //pulling currentUser value from Context component
  //userContext replaced by userReducer
  const currentUser = useSelector(selectCurrentUser);
  const cartOpen = useSelector(selectCartOpen);

  const signOutUser = () => dispatch(signOutStart());

  //removed with Reducer implementation
  // const { cartOpen } = useContext(CartContext);

  // const signOutHandler = async () => {   //functionality moved to user.context
  //   await signOutUser();
  //   setCurrentUser(null);     //sets Context value currentUser to null
  // }

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {cartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
