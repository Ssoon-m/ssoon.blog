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
      className={`rounded-lg ${sizeClasses[size]} bg-gray-100 dark:bg-gray-800 dark:text-indigo-400 text-indigo-500 shrink-0 hover:bg-gray-200 dark:hover:bg-gray-700`}
    >
      {children}
    </Link>
  );
};

export default PostTag;
