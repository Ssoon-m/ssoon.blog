'use client';

import { useEffect, useState } from 'react';

const ScrollProgressBar = () => {
  const [width, setWidth] = useState(0);

  const calcScrollHeight = () => {
    const scrolled = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;
    const progress = (scrolled / (fullHeight - windowHeight)) * 100;
    setWidth(progress);
  };

  useEffect(() => {
    calcScrollHeight();
    window.addEventListener('scroll', calcScrollHeight);
    return () => window.removeEventListener('scroll', calcScrollHeight);
  }, []);
  return (
    <div className="bg-indigo-500 h-full" style={{ width: `${width}%` }}></div>
  );
};

export default ScrollProgressBar;
