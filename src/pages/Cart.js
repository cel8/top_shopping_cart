import { useCartContext } from '@components/CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faRectangleXmark, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '@styles/Cart.css';

const Cart = () => {
  const contextValue = useCartContext();
  const navigate = useNavigate();
  
  const onAlertEvent = useCallback(() => {
    alert("Thanks for using the website. This was just an exercise made for The Odin Project.");
    if (contextValue) contextValue.wipe();
    navigate('/');
  }, [contextValue, navigate]);

  return (
    <div className="App-container">
      {
        contextValue && (contextValue.cart.length !== 0) && <h1>Cart items</h1>
      }
      {
        contextValue && (contextValue.cart.length === 0) && <h1>Cart is empty</h1>
      }        
      <div className="Cart-container">
      {
        contextValue && contextValue.cart.map((item) => {
          const { product, amount } = item;
          return (
            <div className="productCartItem" key={product.id}>
              <div className="productCartBtn">
                <button onClick={() => contextValue.add(product)}><FontAwesomeIcon icon={faSquarePlus} /></button>
                <button onClick={() => contextValue.remove(product, true)}><FontAwesomeIcon icon={faRectangleXmark} /></button>
                <button disabled={amount === 1} onClick={() => contextValue.remove(product)}><FontAwesomeIcon icon={faSquareMinus} /></button>
              </div>
              <img src={product.image} alt={product.id} />
              <div className="productElement">
                <p>{product.name}</p>
                <p>{amount}</p>
              </div>
            </div>
          )
        })
      }
      </div>
      {
        contextValue && (contextValue.cart.length !== 0) && 
        <div className="orderBox">
          <h2>Order Summary</h2>
          <div>Items: <div>{contextValue ? contextValue.orderItems() : 0}</div></div>
          <div>Order total: <div>{contextValue ? contextValue.orderTotal() : 0} €</div></div>
          <button onClick={() => onAlertEvent()}>Checkout</button>
        </div>
      }
    </div>
  )
};

export { Cart };
