import { createAction } from "../../utils/reducer/reducer.utils";
import CART_ACTION_TYPES from "./cart.types";

const addCartItem = (cartItems, product) => {
  const existingCartItem = cartItems.find((item) => item.id === product.id);
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cartItems, { ...product, quantity: 1 }];
};

const removeCartItem = (cartItems, product) => {
  const existingCartItem = cartItems.find((item) => item.id === product.id);
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== product.id);
    //keep the items that don't match the product being removed ID
  }
  return cartItems.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
  );
};

const clearCartItem = (cartItems, product) => {
  return cartItems.filter((item) => item.id !== product.id);
};

export const setCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_CART_OPEN, boolean);

export const addItemToCart = (cartItems, product) => {
  const newCartItems = addCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, product) => {
  const newCartItems = removeCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, product) => {
  const newCartItems = clearCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
