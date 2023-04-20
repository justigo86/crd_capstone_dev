import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({cartItem}) => {
  const { name, quantity, imageUrl, price } = cartItem;
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);

  const removeItemHandler = () => removeItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
      <img src={imageUrl} alt={`${name}`} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <span className="arrow" onClick={removeItemHandler}></span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={addItemHandler}></span>
      </div>
      <div className="price">{price}</div>
      <div className="remove-button">&#10005;</div>
    </div>
  );
}
 
export default CheckoutItem;