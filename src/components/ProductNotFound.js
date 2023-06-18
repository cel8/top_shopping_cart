import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/catalog');    
    }, 1000);
  }, [navigate]);

  return <div>Product not found</div>
}

export default ProductNotFound;
