'use client';
import { Post } from '@/datasets/post';
import { cn } from '@/lib/cn';
import Link from 'next/link';
import { useState } from 'react';

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
    <div className="bg-gray-100 rounded-sm p-4">
      <h2 className="text-gray-700 font-medium text-xl pb-2 hover:underline hover:text-gray-500">
        <Link href={`/${currentSeries.postUrl.replace(/^blog/i, 'series')}`}>
          {currentSeries.title}
        </Link>
      </h2>
      {showMore && (
        <ul className="pb-2">
          {seriesList.map((series, i) => (
            <li key={series._id} className="w-full flex items-start gap-1">
              <span className="select-none text-gray-500 pt-1">{i + 1}.</span>
              <Link
                href={`/${series.postUrl}`}
                className={cn(`py-1 w-full block hover:underline`, {
                  'text-indigo-500': i === currentSeriesIndex,
                })}
              >
                {series.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="w-full flex justify-between text-sm text-gray-400">
        <button onClick={handleShowMoreClick}>
          {showMore ? '목록 접기' : '목록 열기'}
        </button>
        <div>{`${currentSeriesIndex + 1}/${seriesList.length}`}</div>
      </div>
    </div>
  );
};

export default Series;
