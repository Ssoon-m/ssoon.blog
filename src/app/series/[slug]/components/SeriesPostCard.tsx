import Link from 'next/link';
import { Post } from '@/datasets/post';
import { dateFormatter } from '@/utils/date';
import PostTag from '@/components/post/PostTag';
import { GlassCard } from '@/components/ui';

interface SeriesPostCardProps {
  post: Post;
  index: number;
  totalPosts: number;
}

const SeriesPostCard = ({ post, index, totalPosts }: SeriesPostCardProps) => {
  const isCompleted = index < totalPosts;

  return (
    <GlassCard
      className="w-full p-0 my-2 sm:my-3 hover:shadow-glass-medium transition-all duration-300 overflow-hidden"
      elevation="medium"
      hover={true}
    >
      <Link href={`/${post.postUrl}`} className="block">
        <div className="p-4 sm:p-6">
          <div className="flex items-start space-x-3 sm:space-x-4">
            {/* Series Number Badge */}
            <div
              className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
                isCompleted
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {index + 1}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 mb-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3 sm:mb-4">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <PostTag key={i} tag={tag} size="default">
                        {tag}
                      </PostTag>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-gray-400 dark:text-gray-500 px-2 py-1">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                {/* <div className={`ml-2 sm:ml-4 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                  isCompleted 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>
                  {isCompleted ? 'Published' : 'Draft'}
                </div> */}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="hidden sm:inline">
                      {dateFormatter(post.date, 'YYYY-MM-DD')}
                    </span>
                    <span className="sm:hidden">
                      {dateFormatter(post.date, 'MM-DD')}
                    </span>
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {post.readingTime} min
                  </span>
                </div>
                <div className="text-indigo-500 dark:text-indigo-400 font-medium">
                  <span className="hidden sm:inline">
                    Part {index + 1} of {totalPosts}
                  </span>
                  <span className="sm:hidden">
                    {index + 1}/{totalPosts}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </GlassCard>
  );
};

export default SeriesPostCard;
