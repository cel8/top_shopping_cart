import { useParams, useNavigate, Link } from "react-router-dom";
import { productsList } from '@components/ProductsList';
import { NotFound } from '@components/NotFound';
import { useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '@components/CartProvider';
import '@styles/Product.css';

const Product = () => {
  const { id } = useParams();
  const productID = parseInt(id, 10);
  const navigate = useNavigate();
  const contextValue = useCartContext();

  const getProduct = useCallback(() => {
    console.log(productsList[productID - 1].name)
    return productsList[productID - 1];
  }, [productID]);

  const onClickAddItem = useCallback((product) => {
    contextValue.add(product);
  }, [contextValue]);

  return (
    <div className="App-container">
      {
        !isNaN(productID) && (productID >= 1 && productID <= productsList.length) &&
        <div className="product">
          <h1>{getProduct().name}</h1>
          <p>Category: <p>{getProduct().category}</p></p>
          <p>Description: <p>{getProduct().description}</p></p>
          <p>Price: <p>{getProduct().price} €</p></p>
          <div className="product-control">
            <button onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faCircleLeft} />
            </button>
            <button onClick={() => onClickAddItem(getProduct())}><FontAwesomeIcon icon={faCartPlus} /></button>
            <button onClick={() => onClickAddItem(getProduct())}><Link to='/cart' className="App-link">buy now</Link></button>
          </div>
          <img src={getProduct().image} alt={getProduct().id} />
        </div>
      }
      {
        (isNaN(productID) || (productID < 1) || (productID > productsList.length)) &&
          <NotFound destination='/catalog' name='product' />
      }
    </div>
  )
};

export { Product };
