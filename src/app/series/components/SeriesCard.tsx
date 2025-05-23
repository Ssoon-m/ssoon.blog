import { Post } from '@/datasets/post';
import { displayTime } from '@/utils/date';
import Link from 'next/link';

interface SeriesCardProps {
  series: Post;
}

const SeriesCard = ({ series }: SeriesCardProps) => {
  return (
    <div className="h-full rounded-md overflow-hidden">
      <div className="p-[2px] w-full h-full rounded-md overflow-hidden bg-gradient-to-r from-slate-300 to-slate-500  dark:from-indigo-300 dark:to-indigo-500">
        <div className=" bg-slate-50 dark:bg-zinc-900 rounded-md h-full w-full">
          <Link href={`/${series.postUrl.replace(/^blog/i, 'series')}`}>
            <div className="p-3 h-[170px] flex flex-col">
              <div className="pb-3">
                <h2 className="text-xl font-medium">{series.title}</h2>
              </div>
              <div className="pb-2 text-gray-600 dark:text-gray-300">
                <span>{series.description}</span>
              </div>
              <div className="flex-1 text-gray-400 text-sm text-right flex flex-col justify-end">
                마지막 업데이트 : {displayTime(series.date)}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
