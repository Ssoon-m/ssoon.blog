import { Post } from '@/datasets/post';
import { displayTime } from '@/utils/date';
import Link from 'next/link';

interface SeriesCardProps {
  series: Post;
}

const SeriesCard = ({ series }: SeriesCardProps) => {
  return (
    <div className="bg-white h-full rounded-md overflow-hidden">
      <div className="p-[1px] w-full h-full rounded-md overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500 ">
        <div className="bg-white rounded-md h-full w-full">
          <Link
            href={`/${series.postUrl.replace(/^blog/i, 'series')}`}
            className="h-ful"
          >
            <div className="p-3 h-full flex flex-col">
              <div className="pb-3">
                <h2 className="text-xl font-medium">{series.title}</h2>
              </div>
              <div className="pb-2 text-gray-600">
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