import { useState, useLayoutEffect } from 'react';

interface Size {
  width: number;
  height: number;
}

export function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  });

  useLayoutEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
