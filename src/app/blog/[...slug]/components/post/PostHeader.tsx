import { siteData } from '@/constants/my-site';
import { dateFormatter } from '@/utils/date';
import Image from 'next/image';

interface PostHeaderProps {
  title: string;
  date: string;
  readingTime: string;
}

const PostHeader = ({ title, date, readingTime }: PostHeaderProps) => {
  return (
    <header className="mb-12 pb-8 border-b border-gray-100 dark:border-gray-800">
      <div className="relative">
        {/* 좌측 컬러 바 */}
        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>

        <div className="pl-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
            {title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{dateFormatter(date, 'YYYY-MM-DD')}</time>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PostHeader;
