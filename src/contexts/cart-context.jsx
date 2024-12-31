import { createContext, useReducer } from "react";

const CartContext = createContext({
  mealItems: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  amount: 0,
});

function cartReducer(state, action) {
  if (action.type === "ADD") {
    const existingItemIndex = state.mealItems.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.mealItems];

    if (existingItemIndex > -1) {
      const updatedItem = {
        ...updatedItems[existingItemIndex],
        amount: updatedItems[existingItemIndex].amount + 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        ...action.item,
        amount: 1,
      });
    }
    return {
      ...state,
      mealItems: updatedItems,
      amount: state.amount + 1,
    };
  }
  if (action.type === "REMOVE") {
    const existingItemIndex = state.mealItems.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.mealItems[existingItemIndex];
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.mealItems.filter((item) => item.id !== action.id);
      console.log('Item removed from cart');
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.mealItems];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      ...state,
      mealItems: updatedItems,
      amount: state.amount - 1,
    };
  }

  if (action.type === "CLEAR") {
    return {
      ...state,
      mealItems: [],
      amount: 0,
    };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    mealItems: [],
    amount: 0,
  });

  const cartContext = {
    mealItems: cartState.mealItems,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    amount: cartState.amount,
    clearCart: clearCartHandler,
  };

  function addItemHandler(item) {
    dispatchCartAction({ type: "ADD", item: item });
    console.log("Item added to cart");
  }

  function removeItemHandler(id) {
    dispatchCartAction({ type: "REMOVE", id: id });
  }

  function clearCartHandler() {
    dispatchCartAction({ type: "CLEAR" });
  }
  console.log(cartContext);
  return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContext;
