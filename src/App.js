import { faHouse, faCartShopping, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartProvider } from '@components/CartProvider';
import { NotFound } from '@components/NotFound';
import { ShopRoutes } from '@pages/ShopRoutes';
import { Cart } from '@pages/Cart';
import { Home } from '@pages/Home';
import '@styles/App.css';

function App() {
  const themeSettings = useMemo(() => ({
    dark: 'dark',
    light: 'light'
  }), []);

  const [theme, setTheme] = useState(themeSettings['dark']);
  const curYear = new Date().getFullYear();

  const active = useCallback((isActive) => {
    return isActive ? { color: "var(--color-link)" } : {}
  }, []);

  const onToggleTheme = useCallback(() => {
    setTheme(theme === themeSettings['dark'] ? themeSettings['light'] 
    : themeSettings['dark']);
  }, [theme, themeSettings]);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme])

  return (
    <div className="App">
      <header className="App-header">
        <div>ShopizzaFy</div>
        <div>
          <ul><NavLink to="/" style={({isActive}) => active(isActive)} className="App-link"><FontAwesomeIcon icon={faHouse} className='App-link'/></NavLink></ul>
          <ul><NavLink to="/catalog" style={({isActive}) => active(isActive)} className="App-link">Shop</NavLink></ul>
          <ul><NavLink to="/cart" style={({isActive}) => active(isActive)} className="App-link"><FontAwesomeIcon icon={faCartShopping} /></NavLink></ul>
          {
            theme === 'dark' && <ul onClick={() => onToggleTheme()}><FontAwesomeIcon icon={faMoon} /></ul>
          }
          {
            theme === 'light' && <ul onClick={() => onToggleTheme()}><FontAwesomeIcon icon={faSun} /></ul>
          }
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
