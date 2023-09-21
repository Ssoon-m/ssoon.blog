import Link from 'next/link';
import React from 'react';
import ChevronLeftIcon from '../../../../components/icons/ChevronLeftIcon';
import ChevronRightIcon from '../../../../components/icons/ChevronRightIcon';
import { Post } from '@/datasets/post';

interface PostFooterProps {
  prevPost: Post | null;
  nextPost: Post | null;
}

const PostFooter = ({ prevPost, nextPost }: PostFooterProps) => {
  return (
    <footer className="flex justify-between">
      {prevPost ? (
        <Link
          href={prevPost.url}
          aria-label="previous post"
          className="flex gap-1 rounded-lg pr-2 py-2 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition select-none"
        >
          <ChevronLeftIcon />
          {prevPost.title}
        </Link>
      ) : (
        <div />
      )}
      {nextPost ? (
        <Link
          href={nextPost.url}
          aria-label="next post"
          className="flex gap-1 rounded-lg pl-2 py-2 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition select-none"
        >
          {nextPost.title}
          <ChevronRightIcon />
        </Link>
      ) : (
        <div />
      )}
    </footer>
  );
};

export default PostFooter;
