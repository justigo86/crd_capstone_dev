import "./product-card.styles.scss";
import Button from "../button/button.component";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  //products.json file will be passed in - product fields from that data
  // const { addItemToCart } = useContext(CartContext);   //now reducer

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
