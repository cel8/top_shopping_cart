
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '@components/NotFound';
import { Shop } from '@pages/Shop';
import { Product } from '@pages/Product';

const ShopRoutes = () => {
  return (
    <Routes>
      <Route index element={<Shop/>}/>
      <Route path="product/:id" element={<Product/>}/>
      <Route path="*" element={<NotFound destination='/catalog' name='product' />}/>
    </Routes>
  );
};

export { ShopRoutes };
