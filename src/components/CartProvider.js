import { createContext, useCallback, useContext, useMemo, useState } from "react";

export const CartContext = createContext(null);

const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((item) => {

  }, []);

  const removeFromCart = useCallback((item) => {

  }, []);

  const contextValue = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart
  }), [cartItems, addToCart, removeFromCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
};

export const useCartContext = () => {
  return useContext(CartContext);
}

export { CartProvider };
