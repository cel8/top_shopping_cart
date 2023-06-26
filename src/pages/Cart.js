import { useCartContext } from '@components/CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faRectangleXmark, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import '@styles/Cart.css';

const Cart = () => {
  const contextValue = useCartContext();
  
  return (
    <div>
      <h1>Cart</h1>
      <div className="container">
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
      </div>
    </div>
  )
};

export { Cart };
