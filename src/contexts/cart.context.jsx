import { createContext, useState } from "react";

const addCartItem = (cartItems, addedProduct) => {
  const cartItem = cartItems.find (
    (item) => item.id === addedProduct.id
  );
  if (cartItem) {
    return cartItems.map((item) => 
      item.id === addedProduct.id
      ? {...item, quantity: item.quantity + 1}
      : item
    )
  }
  return [...cartItems, { ...addedProduct, quantity: 1 }]
}

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (addedProduct) => {
    setCartItems(addCartItem(cartItems, addedProduct));
  }

  const value = { cartOpen, setCartOpen, cartItems, addCartItem };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}