import { categoryList, productsList } from '@components/ProductsList';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '@components/CartProvider';
import '@styles/Shop.css';
import { useCallback, useState } from 'react';

const Shop = () => {
  const contextValue = useCartContext();

  const [category, setCategory] = useState(categoryList['all']);
  const [searchToken, setSearchToken] = useState("");
  const [searchParam, setSearchParam] = useSearchParams({p: -1});
  const navigate = useNavigate();
  
  const onClickAddItem = useCallback((product) => {
    contextValue.add(product);
  }, [contextValue]);

  const enableCategoryButton = useCallback((categoryName) =>{
    return category === categoryName;
  }, [category]);

  const onCategoryClick = useCallback((categoryName) => {
    setCategory(categoryName);
  }, []);

  const onSearchBarChange = useCallback((event) => {
    const token = event.target.value;
    setSearchToken(token);
    const index = token === "" ? -1 : productsList.findIndex(product => {
      return product.name.toLowerCase().includes(token.toLowerCase())
    });
    setSearchParam({ p: index });
  }, [setSearchParam]);

  const onSearchSubmit = useCallback((event) => {
    event.preventDefault();
    const index = searchParam.get('p');
    const url = index === "-1" ? 'product/404' : productsList[index].to;
    setTimeout(() => {
      navigate(`/catalog/${url}`);    
    }, 500);
  }, [searchParam, navigate]);

  return (
    <div>
      <h1>Shop</h1>
      <div className="categoryContainer">
        <button disabled={enableCategoryButton(categoryList['all'])} 
                onClick={() => onCategoryClick(categoryList['all'])}>
          {categoryList['all']}
        </button>
        <button disabled={enableCategoryButton(categoryList['classic'])} 
                onClick={() => onCategoryClick(categoryList['classic'])}>
          {categoryList['classic']}
        </button>
        <button disabled={enableCategoryButton(categoryList['special'])} 
                onClick={() => onCategoryClick(categoryList['special'])}>
          {categoryList['special']}
        </button>
      </div>
      <div className="searchBar">
        <input type="text" value={searchToken} onChange={e => onSearchBarChange(e)}/>
        <button onClick={e => onSearchSubmit(e)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      </div>
      <div className="catalogContainer">
      {
        productsList.map((product) => {
          return (
            ((product.category === category) || (category === categoryList['all'])) &&
            <div className="productContainer" key={product.id}>
              <Link to={product.to} className="App-link">
                <div className="productItem">
                  <img src={product.image} alt={product.id} />
                  <div>
                    <p>{product.name}</p>
                    <p>{product.price} €</p>
                  </div>
                </div>
              </Link>
              <div className="containerBuy">
                <button onClick={() => onClickAddItem(product)}><FontAwesomeIcon icon={faCartPlus} /></button>
                <button onClick={() => onClickAddItem(product)}><Link to='/cart' className="App-link">buy now</Link></button>
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
