import { dateFormatter } from '@/lib/utils/date';

interface PostHeaderProps {
  title: string;
  date: string;
  readingTime: string;
}

const PostHeader = ({ title, date, readingTime }: PostHeaderProps) => {
  return (
    <header className="text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className=" text-sm text-gray-400">
        <time dateTime={date}>{dateFormatter(date, 'YYYY-MM-DD')}</time>
        <span className="select-none"> · </span> {readingTime} min read
      </p>
    </header>
  );
};

export default PostHeader;
