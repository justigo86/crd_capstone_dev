// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const CheckoutItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  // const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

  //handlers used for code optimization   //obsolete with reducer
  // const removeItemHandler = () => removeItemFromCart(cartItem);
  // const addItemHandler = () => addItemToCart(cartItem);
  // const clearItemHandler = () => clearItemFromCart(cartItem);

  //reducer implementation
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </div>
      <div className="price">{price}</div>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
