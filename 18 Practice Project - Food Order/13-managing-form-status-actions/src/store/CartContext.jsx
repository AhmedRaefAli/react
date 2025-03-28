import { createContext, useReducer } from 'react';

// createContext is a function that creates a new context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching Provider above it in the tree.
const CartContext = createContext({ // default value imp for intellisense and auto complete
  items: [],
  addItem: (item) => { },
  removeItem: (id) => { },
  clearCart: () => { },
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // you should never mutate the state directly, always create a new state object
    // because it update before reducer is finished 
    // so if we mutate the state directly, it will cause unexpected behavior
    // ref values are passed by reference so we need to create a new array 
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  return state;
}

// we have state shared between components (nested in diff places)so we use context api to share the state between components
export function CartContextProvider({ children }) {
  // useReducer is a hook that is used for state management in React. It is an alternative to useState.
  // useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  }

  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  const cartContext = {  // this is the value that we are passing to the provider
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
