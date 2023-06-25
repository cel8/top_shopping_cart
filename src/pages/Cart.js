import { useCartContext } from '@components/CartProvider';

const Cart = () => {
  const contextValue = useCartContext();
  
  return (
    <div>
      <h1>Cart</h1>
      <div className="container">
        {
          contextValue && contextValue.cart.map((item) => {
            return (
              <div className="productCartItem" key={item.product.id}>
                <p>{item.product.name}</p>
                <p>{item.amount}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export { Cart };
