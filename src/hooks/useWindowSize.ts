import { useState, useEffect } from 'react';

function useWindowSize() {
  const isSSR = typeof window === 'undefined';

  const [windowSize, setWindowSize] = useState({
    width: isSSR ? 1 : window.innerWidth,
    height: isSSR ? 1 : window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (!isSSR) {
      window.addEventListener('resize', handleResize);

      // Clean up event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isSSR]); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default useWindowSize;
