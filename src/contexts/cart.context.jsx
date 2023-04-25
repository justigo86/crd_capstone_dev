import { createContext, useReducer } from "react";

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

//NOTE: over the next two functions, we are always creating a new object on return
//this is done because mutating the original object does not trigger a re-render
const addCartItem = (cartItems, product) => {
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

const removeCartItem = (cartItems, product) => {
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

const clearCartItem = (cartItems, product) => {
  return cartItems.filter(item => item.id !== product.id)
}

//Reducer
const INITIAL_STATE = {
  cartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

export const CART_ACTION_TYPES = {
  SET_CART_OPEN: "SET_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_CART_TOTAL: "SET_CART_TOTAL",
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch( type ) {
    case CART_ACTION_TYPES.SET_CART_OPEN:
      return {
        ...state,
        cartOpen: payload,
      }
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    default:
      throw new Error(`Unknown cartReducer type: ${type}.`)
  }
}

export const CartProvider = ({ children }) => {
  //commented out for Reducer
  // const [cartOpen, setCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  //useEffects not needed with Reducer
  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity, 0
  //   );
  //   setCartCount(newCartCount);
  // }, [cartItems])

  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
  //   );
  //   setCartTotal(newCartTotal);
  // }, [cartItems])

  //Reducer state management
  const [ state, dispatch ] = useReducer( cartReducer, INITIAL_STATE );
  const { cartOpen, cartItems, cartCount, cartTotal } = state;
  const setCartOpen = (toggle) => {
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_OPEN,
      payload: toggle,
    })
  }

  const updateCartItemsReducer = (newCartItems) => {
    //pass in new items to update
    //move in login from within useEffect
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
    );

    //set new payload (state)
    const payload = {
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    }

    //dispatch action object
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: payload,
    })
  }

  const addItemToCart = (product) => {
    // const newCartItems = setCartItems(addCartItem(cartItems, product));
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (product) => {
    // const newCartItems = setCartItems(removeCartItem(cartItems, product));
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (product) => {
    // const newCartItems = setCartItems(clearCartItem(cartItems, product));
    const newCartItems = clearCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  }

  const value = {
    cartOpen,
    setCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}