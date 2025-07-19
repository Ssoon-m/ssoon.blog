import { Post } from '@/datasets/post';
import { displayTime } from '@/utils/date';
import Link from 'next/link';
import { GlassCard } from '@/components/ui';

interface SeriesCardProps {
  series: Post;
}

const SeriesCard = ({ series }: SeriesCardProps) => {
  return (
    <GlassCard
      className="h-[180px] p-0 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-glass-heavy"
      elevation="medium"
      hover={true}
    >
      <Link href={`/${series.postUrl.replace(/^blog/i, 'series')}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
              {series.title}
            </h2>
          </div>
          <div className="mb-4 flex-1">
            <p
              className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {series.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                Series
              </span>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {displayTime(series.date)}
            </div>
          </div>
        </div>
      </Link>
    </GlassCard>
  );
};

export default SeriesCard;
