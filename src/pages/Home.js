import imgRestaurant from '@assets/restaurant.jpg';
import { useWindowSize } from "react-use";
import { useCallback, useEffect, useState, useRef } from "react";
import '@styles/Custom.css';

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
    <div className="App-container" ref={divRef} style={{
      backgroundImage: `url(${imgRestaurant})`,
      height: `${height.toFixed(0) - y0}px`
    }}>
      <div className="Home-container">
        <div>
          <h1>ShopizzaFy</h1>
          <div className='subtitle'>Special pizza on-demand!</div>
        </div>
        <div className='credits'>All rights to the images belongs to <a className="App-link" href="https://www.pepeingrani.it/">Pepe in Grani</a></div>
      </div>
    </div>
  )
};

export { Home };
