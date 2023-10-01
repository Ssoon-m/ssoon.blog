import { useEffect } from 'react';

const useDisableScroll = () => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
};

export default useDisableScroll;
