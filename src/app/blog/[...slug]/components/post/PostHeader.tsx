import { siteData } from '@/constants/my-site';
import { dateFormatter } from '@/lib/utils/date';
import Image from 'next/image';

interface PostHeaderProps {
  title: string;
  date: string;
  readingTime: string;
}

const PostHeader = ({ title, date, readingTime }: PostHeaderProps) => {
  return (
    <header className="text-center pb-6">
      <h1 className="text-4xl font-bold text-start">{title}</h1>
      <div className="pt-4 flex">
        <p className="text-start text-gray-400">
          <time dateTime={date}>{dateFormatter(date, 'YYYY-MM-DD')}</time>
          <span className="select-none"> · </span> {readingTime} min read
        </p>
      </div>
    </header>
  );
};

export default PostHeader;
