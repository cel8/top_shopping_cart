import { useParams, useNavigate, Link } from "react-router-dom";
import { productsList } from '@components/ProductsList';
import { NotFound } from '@components/NotFound';
import { useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '@components/CartProvider';

const Product = () => {
  const { id } = useParams();
  const productID = parseInt(id, 10);
  const navigate = useNavigate();
  const contextValue = useCartContext();

  const getProduct = useCallback((id) => {
    return productsList[productID - 1];
  }, [productID]);

  const onClickAddItem = useCallback((product) => {
    contextValue.add(product);
  }, [contextValue]);

  return (
    <div className="App-container">
      {
        !isNaN(productID) && (productID >= 1 && productID < productsList.length) &&
        <div>
          <div>
            <button onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faCircleLeft} />
            </button>
            <button onClick={() => onClickAddItem(getProduct(productID))}><FontAwesomeIcon icon={faCartPlus} /></button>
            <button onClick={() => onClickAddItem(getProduct(productID))}><Link to='/cart' className="App-link">buy now</Link></button>
          </div>
          <div className="product">
            <h1>{getProduct(productID).name}</h1>
            <p>{getProduct(productID).category}</p>
            <p>{getProduct(productID).description}</p>
            <p>{getProduct(productID).price} €</p>
            <img src={getProduct(productID).image} alt={getProduct(productID).id} />
          </div>
        </div>
      }
      {
        (isNaN(productID) || (productID < 1) || (productID >= productsList.length)) &&
          <NotFound destination='/catalog' name='product' />
      }
    </div>
  )
};

export { Product };
