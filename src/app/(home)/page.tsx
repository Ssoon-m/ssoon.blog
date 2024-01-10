import Link from 'next/link';
import Image from 'next/image';
import { siteData } from '@/constants/my-site';
import PostCardList from '@/components/post/PostCardList';
import { getMainPosts } from '@/datasets/post';
export default function Home() {
  const posts = getMainPosts();
  return (
    <div className="pt-6">
      <div className="flex items-center sm:justify-between flex-wrap flex-col sm:flex-row">
        <div className="order-2 sm:order-1 text-center sm:text-start mt-2 sm:mt-0">
          <h1 className="text-2xl font-bold">{siteData.auhtor.name}</h1>
          <h3 className="text-lg text-gray-400">프론트엔드 개발자</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            안녕하세요
            <span className="inline-block animate-shake">👋</span>
            &nbsp;주니어 프론트엔드 개발자입니다.
            <br />
            좋은 사용자 경험을 위해 학습하고 기록합니다.
          </p>
        </div>
        <div className="relative order-1 sm:order-2">
          <Image
            src={siteData.auhtor.profile}
            alt="profile"
            width={120}
            height={120}
            priority
            className="rounded"
          />
        </div>
      </div>
      <div className="h-[50px]" />
      <div className="mb-3">
        <h2 className="text-3xl fong-bold">Latest Posts</h2>
      </div>
      <div className="h-[30px]" />
      <PostCardList posts={posts} />
      <div className="w-full flex justify-end hover:-translate-y-[1.5px] transform duration-200 mb-5">
        <Link
          href="/blog"
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-100 hover:underline align-middle"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
