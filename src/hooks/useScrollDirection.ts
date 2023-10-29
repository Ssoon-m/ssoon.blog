import { useEffect, useRef, useState } from 'react';
import useThrottle from './useThrottle';
const useScrollDirection = () => {
  const lastScrollTop = useRef(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  const handleScroll = useThrottle(() => {
    const scrollTop = window.scrollY;
    if (scrollTop < 50) {
      setScrollDirection('up');
      return;
    }
    if (scrollTop > lastScrollTop.current) {
      setScrollDirection('down');
    } else {
      setScrollDirection('up');
    }
    lastScrollTop.current = scrollTop;
  }, 100);

  useEffect(() => {
    lastScrollTop.current = window.scrollY;
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return scrollDirection;
};

export default useScrollDirection;
