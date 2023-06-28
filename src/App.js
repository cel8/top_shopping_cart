import { faHouse, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useCallback } from 'react';
import { CartProvider } from '@components/CartProvider';
import { NotFound } from '@components/NotFound';
import { ShopRoutes } from '@pages/ShopRoutes';
import { Cart } from '@pages/Cart';
import { Home } from '@pages/Home';
import '@styles/App.css';

function App() {
  const curYear = new Date().getFullYear();

  const active = useCallback((isActive) => {
    return isActive ? { color: 'red' } : {}
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>ShopizzaFy</div>
        <div>
          <ul><NavLink to="/" style={({isActive}) => active(isActive)} className="App-link"><FontAwesomeIcon icon={faHouse} className='App-link'/></NavLink></ul>
          <ul><NavLink to="/catalog" style={({isActive}) => active(isActive)} className="App-link">Shop</NavLink></ul>
          <ul><NavLink to="/cart" style={({isActive}) => active(isActive)} className="App-link"><FontAwesomeIcon icon={faCartShopping} /></NavLink></ul>
        </div>
      </header>
      <CartProvider>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/catalog/*' element={<ShopRoutes/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='*' element={<NotFound destination='/' name='page' />}/>
        </Routes>
        </CartProvider>
      <footer className="App-footer">
        <div>Copyright © {curYear} - Alessandro Celotti <a className="App-link" href="https://github.com/cel8"><FontAwesomeIcon icon={faGithub}/></a></div>
      </footer>
    </div>
  );
}

export default App;
