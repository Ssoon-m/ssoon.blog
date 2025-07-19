import Link from 'next/link';

interface PostTagProps {
  tag: string;
  size?: 'default' | 'large';
  children: React.ReactNode;
}

const sizeClasses = {
  default: 'px-2 py-[2px] text-sm',
  large: 'px-4 py-[4px] text-base',
};

const PostTag = ({ tag, size = 'default', children }: PostTagProps) => {
  return (
    <Link
      href={`/tags/${tag}`}
      className={`inline-flex items-center rounded-full ${sizeClasses[size]} font-medium bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 shrink-0 hover:from-indigo-100 hover:to-blue-100 dark:hover:from-indigo-900/60 dark:hover:to-blue-900/60 hover:border-indigo-300/80 dark:hover:border-indigo-700/80 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105`}
    >
      {children}
    </Link>
  );
};

export default PostTag;
