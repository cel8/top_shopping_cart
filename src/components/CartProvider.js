import { createContext, useCallback, useContext, useMemo, useReducer } from "react";

export const CartContext = createContext(null);

const CartReducer = (state, action) => {
  switch(action.type) {
    case 'add':
      return [...state, {
        amount: 1,
        product: action.product
      }];
    case 'increase':
      {
        const index = state.findIndex(item => item.product.id === action.product.id);
        if (index < 0) return state;
        const update = [...state];
        update[index].amount += 1;
        return update;
      }
    case 'decrease':
      {
        const index = state.findIndex(item => item.product.id === action.product.id);
        if (index < 0) return state;
        const update = [...state];
        update[index].amount -= 1;
        return update;
      }
    case 'remove':
      {
        const index = state.findIndex(item => item.product.id === action.product.id);
        if (index < 0) return state;
        const update = [...state];
        update.splice(index, 1);
        return update;
      }
    default: 
      return state;
  }
};

const CartProvider = ({children}) => {
  const [cart, setCart] = useReducer(CartReducer, []);

  const find = useCallback((item) => {
    if (!cart) return -1;
    const index = cart.findIndex(element => element.product.id === item.id);
    return index;
  }, [cart]);

  // eslint-disable-next-line no-unused-vars
  const exist = useCallback((item) => {
    return find(item) >= 0;
  }, [find]);

  const get = useCallback((item) => {
    const itemExist = (index) => index >= 0;
    const getProduct = (index) => itemExist(index) ? cart[index].product : undefined;
    const getAmount = (index) => itemExist(index) ? cart[index].amount : 0;
    const index = find(item);
    return {
      exist: itemExist(index),
      index,
      product: getProduct(index),
      amount: getAmount(index)
    }
  }, [cart, find]);

  const add = useCallback((item) => {
    const object = get(item);
    if (!object.exist) setCart({product: item, type: 'add'});
    else setCart({product: item, type: 'increase', index: object.index});
  }, [get]);

  const remove = useCallback((item, empty = false) => {
    const object = get(item);
    if (object.exist) {
      if (1 === object.amount || empty) setCart({product: item, type: 'remove'});
      else setCart({product: item, type: 'decrease', index: object.index});
    }
  }, [get]);

  const orderTotal = useCallback(() => {
    const currencyOptions = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }

    const total = cart.reduce((price, item) => price + (item.amount * item.product.price), 0);
    return total.toLocaleString(undefined, currencyOptions)
  }, [cart]);

  const orderItems = useCallback(() => {
    const total = cart.reduce((totalAmount, item) => totalAmount + item.amount, 0);
    return total;
  }, [cart]);

  const contextValue = useMemo(() => ({
    cart,
    add,
    remove,
    orderTotal,
    orderItems
  }), [cart, add, remove, orderTotal, orderItems]);

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
