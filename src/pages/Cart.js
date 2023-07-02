import { useCartContext } from '@components/CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faRectangleXmark, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import '@styles/Cart.css';

const Cart = () => {
  const contextValue = useCartContext();
  
  return (
    <div className="App-container">
      {
        contextValue && contextValue.cart.map((item) => {
          const { product, amount } = item;
          return (
            <div className="productCartItem" key={product.id}>
              <img src={product.image} alt={product.id} />
              <div className="productElement">
                <p>{product.name}</p>
                <p>{amount}</p>
              </div>
              <div className="productCartBtn">
                <button onClick={() => contextValue.add(product)}><FontAwesomeIcon icon={faSquarePlus} /></button>
                <button onClick={() => contextValue.remove(product, true)}><FontAwesomeIcon icon={faRectangleXmark} /></button>
                <button disabled={amount === 1} onClick={() => contextValue.remove(product)}><FontAwesomeIcon icon={faSquareMinus} /></button>
              </div>
            </div>
          )
        })
      }
      {
        contextValue && (contextValue.cart.length === 0) && <p>Cart is empty</p>
      }
      <div className="orderBox">
        {
          <div>
            <p>Order Summary</p>
            <p>Items: {contextValue ? contextValue.orderItems() : 0}</p>
            <p>Order total: {contextValue ? contextValue.orderTotal() : 0} €</p>
            <button onClick={() => alert("Thanks for using the website. This was just an exercise made for The Odin Project.")}>Checkout</button>
          </div>
        }
      </div>
    </div>
  )
};

export { Cart };
