'use client';
import { Post } from '@/datasets/post';
import { cn } from '@/lib/cn';
import Link from 'next/link';
import { useState } from 'react';
import { GlassContainer } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';

interface SeriesProps {
  series: {
    currentSeries: Post;
    seriesList: Post[];
    currentSeriesIndex: number;
  };
}
const Series = ({ series }: SeriesProps) => {
  const { currentSeries, seriesList, currentSeriesIndex } = series;
  const [showMore, setShowMore] = useState(true);
  const handleShowMoreClick = () => {
    setShowMore((showMore) => !showMore);
  };

  return (
    <GlassContainer className="p-4 sm:p-6" variant="primary">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="flex items-center px-2 sm:px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 rounded-full text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-medium">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full mr-1.5 sm:mr-2"></div>
          Series
        </div>
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {currentSeriesIndex + 1} of {seriesList.length}
        </div>
      </div>

      <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-lg sm:text-xl mb-3 sm:mb-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 leading-tight">
        <Link href={`/${currentSeries.postUrl.replace(/^blog/i, 'series')}`}>
          {currentSeries.title}
        </Link>
      </h2>

      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
              {seriesList.map((series, i) => (
                <li
                  key={series._id}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <div
                    className={cn(
                      'flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-200',
                      {
                        'bg-indigo-500 text-white': i === currentSeriesIndex,
                        'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300':
                          i !== currentSeriesIndex,
                      },
                    )}
                  >
                    {i + 1}
                  </div>
                  <Link
                    href={`/${series.postUrl}`}
                    className={cn(
                      'flex-1 py-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 leading-relaxed text-sm sm:text-base',
                      {
                        'text-indigo-600 dark:text-indigo-400 font-medium':
                          i === currentSeriesIndex,
                        'text-gray-700 dark:text-gray-300':
                          i !== currentSeriesIndex,
                      },
                    )}
                  >
                    {series.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-glass-light">
        <button
          onClick={handleShowMoreClick}
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
        >
          <svg
            className={cn(
              'w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200',
              {
                'rotate-180': !showMore,
              },
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          {showMore ? '목록 접기' : '목록 열기'}
        </button>
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
          Part {currentSeriesIndex + 1}/{seriesList.length}
        </div>
      </div>
    </GlassContainer>
  );
};

export default Series;
