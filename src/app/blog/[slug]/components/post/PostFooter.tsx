import Link from 'next/link';
import React from 'react';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import { Post } from '@/datasets/post';
import Image from 'next/image';
import { siteData } from '@/constants/my-site';
import GithubLink from '@/components/common/GithubLink';
import MailLink from '@/components/common/MailLink';
import VelogLink from '@/components/common/VelogLink';

interface PostFooterProps {
  prevPost: Post | null;
  nextPost: Post | null;
}

const PostFooter = ({ prevPost, nextPost }: PostFooterProps) => {
  return (
    <div>
      <div className="py-4 flex gap-3 justify-start items-center">
        <Image
          src={siteData.auhtor.profile}
          alt="profile"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <div>
            <div className="text-lg font-bold">권순민</div>
            <div className="text-gray-400">프론트엔드 개발자 권순민입니다.</div>
            <div className="flex gap-1 items-center">
              <GithubLink />
              <VelogLink />
              <MailLink width={28} height={28} />
            </div>
          </div>
        </div>
      </div>
      <footer className="flex justify-between">
        {prevPost ? (
          <Link
            href={`/${prevPost.postUrl}`}
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
            href={`/${nextPost.postUrl}`}
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
    </div>
  );
};

export default PostFooter;
