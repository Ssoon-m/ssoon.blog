import Link from 'next/link';
import { Post } from '@/datasets/post';
import { dateFormatter } from '@/lib/utils/date';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={post.url}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {dateFormatter(post.date, 'MM D, YYYY')}
      </time>
      <div>{post.readingTime}분</div>
    </div>
  );
};

export default PostCard;
