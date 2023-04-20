import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

const addItem = (cartItems, product) => {
  const existingCartItem = cartItems.find(item => item.id === product.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === product.id
      ? { ...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    )
  }

  return [...cartItems, {...product, quantity: 1}]
}

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0
    );
    setCartCount(newCartCount);
  }, [cartItems])

  const addItemToCart = (product) => {
    setCartItems(addItem(cartItems, product));
  }

  const value = { cartOpen, setCartOpen, cartItems, addItemToCart, cartCount };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}