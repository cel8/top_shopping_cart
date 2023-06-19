import { productsList } from '@components/ProductsList';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import '@styles/Shop.css';

const Shop = () => {
  return (
    <div>
      <h1>Shop</h1>
      <div className="catalogContainer">
      {
        productsList.map((product) => {
          return (
            <div className="productContainer" key={product.id}>
              <Link to={product.to}>
                <div className="productItem">
                  <img src={product.image} alt={product.id} />
                  <p>{product.name}</p>
                </div>
              </Link>
              <div className="containerBuy">
                <button><FontAwesomeIcon icon={faCartPlus} /></button>
                <button><Link to='/cart'>buy now</Link></button>
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
};

export { Shop };
