import Link from 'next/link';
import { Post } from '@/datasets/post';
import { dateFormatter } from '@/lib/utils/date';
import Image from 'next/image';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <Link href={post.url} className="group">
      <div className="py-2 flex flex-col sm:flex-row gap-6 justify-start items-center h-full">
        <div className="w-full">
          <h2 className="group-hover:underline text-2xl font-medium">
            {post.title}
          </h2>
          <h4 className="text-l mb-2 text-gray-600 dark:text-gray-300">
            {post.description}
          </h4>
          <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center flex-wrap gap-2">
            <div className="flex flex-start items-center flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <div
                  className="rounded-lg px-2 py-[2px] bg-gray-100 dark:bg-gray-800 dark:text-indigo-400 text-sm text-indigo-500 shrink-0 hover:bg-gray-200 dark:hover:bg-gray-700"
                  key={i}
                >
                  {tag}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400">
              {dateFormatter(post.date, 'YYYY-MM-DD')}
              <span className="select-none"> · </span> {post.readingTime} min
              read
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
