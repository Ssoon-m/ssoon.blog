'use client';
import React from 'react';
import ArrowTopIcon from './icons/ArrowTopIcon';
import useIsScrolled from '@/hooks/useIsScrolled';

const ScrollTopButton = () => {
  const isTopScroll = useIsScrolled();
  const moveToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return isTopScroll ? (
    <div className="fixed bottom-4 right-4">
      <button
        aria-label="scroll to top button"
        className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-gray-200 bg-opacity-60 dark:bg-opacity-60 bg-gray-100 dark:border-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 hover:bg-zinc-200 text-gray-600 dark:text-gray-400 drop-shadow-sm"
        onClick={moveToTop}
      >
        <ArrowTopIcon />
      </button>
    </div>
  ) : null;
};

export default ScrollTopButton;
