'use client';
import { cn } from '@/lib/cn';
import { type Toc } from '@/lib/types/toc-type';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const numberToStringMap = {
  1: 'one',
  2: 'two',
  3: 'three',
};

const getScrollTop = () => {
  if (!document.body) return 0;
  if (document.documentElement && 'scrollTop' in document.documentElement) {
    return document.documentElement.scrollTop || document.body.scrollTop;
  } else {
    return document.body.scrollTop;
  }
};

interface IHeadingTops {
  slug: string;
  top: number;
}

interface TocSideProps {
  tableOfContents: Toc[];
  isFloating?: boolean;
}

const TocSide = ({ tableOfContents, isFloating = false }: TocSideProps) => {
  const [activeToc, setActiveToc] = useState('');
  const [headingTops, setHeadingTops] = useState<null | IHeadingTops[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const settingHeadingTops = useCallback(() => {
    const scrollTop = getScrollTop();
    const headingTops = tableOfContents.map(({ slug }) => {
      const el = document.getElementById(slug);
      const top = el ? el.getBoundingClientRect().top + scrollTop : 0;
      return { slug, top };
    });
    setHeadingTops(headingTops);
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
      if (!headingTops) return;
      const currentHeading = headingTops
        .slice()
        .reverse()
        .find((headingTop) => scrollTop >= headingTop.top - 4);

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

  if (!tableOfContents.length) return null;

  const renderHeader = () => (
    <div
      className={cn(
        'flex items-center mb-4',
        isFloating ? 'justify-between' : 'gap-2',
      )}
    >
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
        <span className="text-base font-semibold text-gray-800 dark:text-gray-200">
          In this article
        </span>
      </div>
      {isFloating && (
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg
            className="w-4 h-4 text-gray-500"
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
      )}
    </div>
  );

  const renderTocList = () => (
    <ul className="space-y-1">
      {tableOfContents.map((toc, i) => (
        <li
          data-level={numberToStringMap[toc.level]}
          key={i}
          className={cn(
            'relative group transition-all duration-200 rounded-lg',
            'hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400',
            {
              'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 font-medium shadow-sm':
                activeToc === toc.slug,
              'text-gray-600 dark:text-gray-400': activeToc !== toc.slug,
            },
          )}
        >
          <Link
            href={`#${toc.slug}`}
            className={cn(
              'block py-2 text-sm transition-all duration-200 relative',
              'data-[level=one]:pl-3 data-[level=two]:pl-7 data-[level=three]:pl-9',
              'pr-3',
            )}
            data-level={numberToStringMap[toc.level]}
          >
            {activeToc === toc.slug && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
            )}
            <span className="block truncate">{toc.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  const tocContent = (
    <div className="glass-light backdrop-blur-md border border-glass-light rounded-xl p-4 shadow-lg">
      {renderHeader()}
      {renderTocList()}
    </div>
  );

  if (isFloating) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-24 right-4 z-40 max-w-[280px] w-full max-h-[calc(100vh-120px)] overflow-y-auto"
          >
            {tocContent}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return <div className="sticky top-24">{tocContent}</div>;
};

export default TocSide;
