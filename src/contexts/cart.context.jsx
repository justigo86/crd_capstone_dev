import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
});

//NOTE: over the next two functions, we are always creating a new object on return
//this is done because mutating the original object does not trigger a re-render
const addItem = (cartItems, product) => {
  const existingCartItem = cartItems.find(item => item.id === product.id);

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === product.id
      ? { ...item, quantity: item.quantity + 1}
      : item
    )
  }

  return [...cartItems, {...product, quantity: 1}]
}
const removeItem = (cartItems, product) => {
  const existingCartItem = cartItems.find(item => item.id === product.id);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(item => item.id !== product.id)
      //keep the items that don't match the product being removed ID
  }
  return cartItems.map((item) =>
    item.id === product.id
    ? { ...item, quantity: item.quantity - 1}
    : item
  )
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

  const removeItemFromCart = (product) => {
    setCartItems(removeItem(cartItems, product));
  }

  const value = {
    cartOpen,
    setCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}