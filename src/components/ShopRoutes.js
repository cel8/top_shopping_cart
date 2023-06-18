
import { Routes, Route } from 'react-router-dom';
import Shop from './Shop';
import ProductNotFound from './ProductNotFound';
import Product from './Product';

const ShopRoutes = () => {
  return (
    <Routes>
      <Route index element={<Shop/>}/>
      <Route path="product/:id" element={<Product/>}/>
      <Route path="*" element={<ProductNotFound/>}/>
    </Routes>
  );
};

export default ShopRoutes;
