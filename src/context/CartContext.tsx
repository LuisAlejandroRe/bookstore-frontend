import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { CartState, CartAction } from "../types/index";

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const initialCartState: CartState = {
  items: [],
  totalAmount: 0,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para acceder al contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser utilizado dentro de un CartProvider");
  }
  return context;
};
