import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectCartOpen,
} from "../../store/cart/cart.selector";
import { setCartOpen } from "../../store/cart/cart.action";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  // const { cartOpen, setCartOpen, cartCount } = useContext(CartContext);  // now a reducer
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const cartOpen = useSelector(selectCartOpen);

  const toggleDropdown = () => dispatch(setCartOpen(!cartOpen));

  return (
    <div className="cart-icon-container" onClick={toggleDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
