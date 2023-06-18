import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHouse, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ShopRoutes from './components/ShopRoutes';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import './styles/App.css';

function App() {
  const curYear = new Date().getFullYear();

  return (
    <div className="App">
      <header className="App-header">
        <ul><Link to="/"><FontAwesomeIcon icon={faHouse} /></Link></ul>
        <ul><Link to="/catalog">Shop</Link></ul>
        <ul><Link to="/cart"><FontAwesomeIcon icon={faCartShopping} /></Link></ul>
      </header>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/catalog/*' element={<ShopRoutes/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <footer className="App-footer">
        <div>Copyright © {curYear} - Alessandro Celotti <a className="App-link" href="https://github.com/cel8"><FontAwesomeIcon icon={faGithub}/></a></div>
      </footer>
    </div>
  );
}

export default App;
