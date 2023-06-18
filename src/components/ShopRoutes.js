
import { Routes, Route } from 'react-router-dom';
import Shop from '@components/Shop';
import ProductNotFound from '@components/ProductNotFound';
import Product from '@components/Product';

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
