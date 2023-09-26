import { useEffect, useState } from 'react';
import useThrottle from './useThrottle';
const scrollOffset = 15;

const useIsScrolled = () => {
  const [_isScroll, setIsScroll] = useState(false);

  const updateScroll = () => {
    const { scrollY } = window;
    scrollY > scrollOffset ? setIsScroll(true) : setIsScroll(false);
  };

  const handleWheel = useThrottle(updateScroll, 10);

  useEffect(() => {
    window.addEventListener('scroll', handleWheel);
    return () => window.removeEventListener('scroll', handleWheel);
  });
  return _isScroll;
};

export default useIsScrolled;
