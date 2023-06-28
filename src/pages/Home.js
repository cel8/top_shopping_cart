import imgRestaurant from '@assets/restaurant.jpg';
import { useWindowSize } from "react-use";
import { useCallback, useEffect, useState, useRef } from "react";

const Home = () => {
  const { height } = useWindowSize();
  const [y0, setY0] = useState(0);
  const divRef = useRef();

  const onResize = useCallback(() => {
    const { y } = divRef.current.getBoundingClientRect();
    setY0(y);
  }, [divRef, setY0]);

  useEffect(() => {
    const onPageLoad = () => {
      const { y } = divRef.current.getBoundingClientRect();
      setY0(y);
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('load', onResize);
    return () => window.removeEventListener('load', onResize);
  }, [y0, onResize]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [y0, onResize]);

  return (
    <div ref={divRef} style={{
      backgroundImage: `url(${imgRestaurant})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: `${height.toFixed(0) - y0}px`,
      overflow: 'none'
    }}>
      <h1>Home</h1>
      <div className="container">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime inventore, officiis neque accusamus tempore quas porro sed autem totam! Corporis laboriosam tempore et natus, eligendi hic excepturi esse harum animi!
      </div>
    </div>
  )
};

export { Home };
