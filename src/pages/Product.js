import { useParams } from "react-router-dom";
import { productsList } from '@components/ProductsList';
import { NotFound } from '@components/NotFound';
import { useCallback } from "react";

const Product = () => {
  const { id } = useParams();
  const productID = parseInt(id, 10);

  const getProduct = useCallback((id) => {
    return productsList[productID - 1];
  }, [productID]);

  return (
    <div>
      <h1>Product</h1>
      {
        !isNaN(productID) && (productID >= 1 && productID < productsList.length) &&
          <div className="product">
            <p>{getProduct(productID).name}</p>
            <p>{getProduct(productID).category}</p>
            <p>{getProduct(productID).description}</p>
            <p>{getProduct(productID).price} €</p>
            <img src={getProduct(productID).image} alt={getProduct(productID).id} />
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
