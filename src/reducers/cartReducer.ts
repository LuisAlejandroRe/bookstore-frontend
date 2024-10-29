import { CartState, CartAction } from "../types/index";

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingItemIndex];

      let updatedItems;
      if (existingItem) {
        // Si el artículo ya existe en el carrito, incrementa la cantidad
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        // Si el artículo no está en el carrito, añádelo
        updatedItems = [...state.items, action.payload];
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount:
          state.totalAmount + action.payload.price * action.payload.quantity,
      };

    case "REMOVE_ITEM":
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      const removedItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      return {
        ...state,
        items: filteredItems,
        totalAmount: removedItem
          ? state.totalAmount - removedItem.price * removedItem.quantity
          : state.totalAmount,
      };

    case "CLEAR_CART":
      return {
        items: [],
        totalAmount: 0,
      };

    default:
      return state;
  }
};
