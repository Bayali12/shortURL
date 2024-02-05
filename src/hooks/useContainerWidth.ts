import { useState, useEffect, useRef } from 'react';

const useDynamicContainerWidth = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const updateContainerWidth = () => {
    if (containerRef.current) {
      const width = containerRef.current.getBoundingClientRect().width;
      setContainerWidth(width);
    }
  };

  useEffect(() => {
    updateContainerWidth();

    const handleResize = () => {
      updateContainerWidth();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { containerRef, containerWidth };
};

export default useDynamicContainerWidth;
