import Link from 'next/link';
import { Post } from '@/datasets/post';
import { dateFormatter } from '@/utils/date';
import PostTag from './PostTag';
import { GlassCard } from '@/components/ui';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <GlassCard
      className="w-full p-6 my-2 hover:shadow-glass-medium transition-all duration-300"
      elevation="medium"
      hover={true}
    >
      <div className="w-full">
        <Link href={`/${post.postUrl}`} className="group">
          <h2 className="group-hover:underline text-2xl font-medium text-gray-900 dark:text-gray-100">
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
          <p className="text-xs text-gray-400 dark:text-gray-500">
            <time dateTime={post.date}>
              {dateFormatter(post.date, 'YYYY-MM-DD')}
            </time>
            <span className="select-none"> · </span> {post.readingTime} min read
          </p>
        </div>
      </div>
    </GlassCard>
  );
};

export default PostCard;
