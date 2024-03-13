import Link from 'next/link';
import { Post } from '@/datasets/post';
import { dateFormatter } from '@/lib/utils/date';
import PostTag from './PostTag';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <div className="w-full py-2 flex flex-col sm:flex-row gap-6 justify-start items-center h-full">
      <div className="w-full">
        <Link href={`/${post.postUrl}`} className="group">
          <h2 className="group-hover:underline text-2xl font-medium">
            {post.title}
          </h2>
          <h4 className="text-l mb-2 text-gray-600 dark:text-gray-300">
            {post.description}
          </h4>
        </Link>
        <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center flex-wrap gap-2">
          <div className="flex flex-start items-center flex-wrap gap-2">
            {post.tags.map((tag, i) => (
              <PostTag key={i} tag={tag}>
                {tag}
              </PostTag>
            ))}
          </div>
          <p className="text-xs text-gray-400">
            <time dateTime={post.date}>
              {dateFormatter(post.date, 'YYYY-MM-DD')}
            </time>
            <span className="select-none"> · </span> {post.readingTime} min read
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
