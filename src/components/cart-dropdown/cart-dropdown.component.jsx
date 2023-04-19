import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";

//to be imported into navigation component
const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        <Button>GO TO CHECKOUT</Button>
      </div>
    </div>
  );
}
 
export default CartDropdown;