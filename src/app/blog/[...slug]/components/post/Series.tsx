'use client';
import { Post } from '@/datasets/post';
import { cn } from '@/lib/cn';
import Link from 'next/link';

interface SeriesProps {
  series: {
    seriesName: string;
    seriesList: Post[];
    currentSeriesIndex: number;
  };
}
const Series = ({ series }: SeriesProps) => {
  const { seriesName, seriesList, currentSeriesIndex } = series;
  return (
    <div className="bg-gray-100 rounded-sm p-4">
      <h2 className="text-gray-700 font-medium text-xl pb-2">{seriesName}</h2>
      <ul>
        {seriesList.map((series, i) => (
          <li key={series._id} className="w-full flex items-center gap-1">
            <span className="select-none text-gray-500">{i + 1}.</span>
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
    </div>
  );
};

export default Series;
