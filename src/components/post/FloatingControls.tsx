'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TocSide from './TocSide';
import { type Toc } from '@/lib/types/toc-type';
import useIsScrolled from '@/hooks/useIsScrolled';
import { cn } from '@/lib/cn';

interface FloatingControlsProps {
  tableOfContents: Toc[];
}

const getScrollTop = () => {
  if (!document.body) return 0;
  if (document.documentElement && 'scrollTop' in document.documentElement) {
    return document.documentElement.scrollTop || document.body.scrollTop;
  } else {
    return document.body.scrollTop;
  }
};

const FloatingControls = ({ tableOfContents }: FloatingControlsProps) => {
  const [isTocOpen, setIsTocOpen] = useState(true);
  const [activeToc, setActiveToc] = useState('');
  const [headingTops, setHeadingTops] = useState<
    { slug: string; top: number }[]
  >([]);
  const isScrolled = useIsScrolled();

  const moveToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const settingHeadingTops = useCallback(() => {
    const scrollTop = getScrollTop();
    const tops = tableOfContents.map(({ slug }) => {
      const el = document.getElementById(slug);
      const top = el ? el.getBoundingClientRect().top + scrollTop : 0;
      return { slug, top };
    });
    setHeadingTops(tops);
  }, [tableOfContents]);

  useEffect(() => {
    settingHeadingTops();
    let prevScrollHeight = document.body.scrollHeight;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const trackScrollHeight = () => {
      const scrollHeight = document.body.scrollHeight;
      if (prevScrollHeight !== scrollHeight) {
        settingHeadingTops();
      }
      prevScrollHeight = scrollHeight;
      timeoutId = setTimeout(trackScrollHeight, 250);
    };

    timeoutId = setTimeout(trackScrollHeight, 250);

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [settingHeadingTops]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = getScrollTop();
      if (!headingTops.length) return;

      const currentHeading = headingTops
        .slice()
        .reverse()
        .find((headingTop) => scrollTop >= headingTop.top - 100);

      if (currentHeading) {
        setActiveToc(currentHeading.slug);
      } else {
        setActiveToc('');
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [headingTops]);

  if (!isScrolled) return null;

  return (
    <>
      {/* Floating TOC */}
      <AnimatePresence>
        {isTocOpen && tableOfContents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-24 right-4 z-40 max-w-[280px] w-full max-h-[calc(100vh-200px)] overflow-y-auto rounded-xl"
          >
            <div className="bg-white/98 dark:bg-gray-900/98 backdrop-blur-md border border-gray-200 dark:border-gray-600 rounded-xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </div>
                  <span className="text-base font-semibold text-gray-800 dark:text-gray-100">
                    In this article
                  </span>
                </div>
                <button
                  onClick={() => setIsTocOpen(false)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <ul className="space-y-1">
                {tableOfContents.map((toc, i) => (
                  <li
                    key={i}
                    className={cn(
                      'relative group transition-all duration-200',
                      'hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-800/50 dark:hover:text-indigo-300 rounded-lg',
                      {
                        'pl-0': toc.level === 1,
                        'pl-4': toc.level === 2,
                        'pl-6': toc.level === 3,
                      },
                      {
                        'bg-indigo-100 text-indigo-700 dark:bg-indigo-800/60 dark:text-indigo-200 font-medium shadow-sm':
                          activeToc === toc.slug,
                        'text-gray-600 dark:text-gray-300':
                          activeToc !== toc.slug,
                      },
                    )}
                  >
                    {activeToc === toc.slug && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
                    )}
                    <a
                      href={`#${toc.slug}`}
                      className={cn(
                        'block py-2 px-3 text-sm transition-all duration-200 relative',
                      )}
                    >
                      <span className="block truncate">{toc.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Control Buttons */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        {/* TOC Toggle Button */}
        {tableOfContents.length > 0 && (
          <motion.button
            onClick={() => setIsTocOpen(!isTocOpen)}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-indigo-500/25">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
          </motion.button>
        )}

        {/* Scroll to Top Button */}
        <motion.button
          onClick={moveToTop}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-indigo-500/25">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 11l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
        </motion.button>
      </div>
    </>
  );
};

export default FloatingControls;
