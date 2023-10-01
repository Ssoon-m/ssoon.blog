import Link from 'next/link';
import { getMainPosts } from '@/datasets/post';
import Image from 'next/image';
import PostCard from '@/components/post/PostCard';
import { siteData } from '@/constants/my-site';

export default function Home() {
  const posts = getMainPosts();

  return (
    <div className="pt-6">
      <div className="flex items-center sm:justify-between flex-wrap flex-col sm:flex-row">
        <div className="order-2 sm:order-1 text-center sm:text-start mt-2 sm:mt-0">
          <h1 className="text-2xl font-bold">{siteData.auhtor.name}</h1>
          <h3 className="text-lg text-gray-400">프론트엔드 개발자</h3>
          <p className="text-gray-600 dark:text-gray-300">
            좋은 사용자 경험을 위해 학습하고 기록합니다.😄
          </p>
        </div>
        <div className="relative order-1 sm:order-2">
          <Image
            src={'/my-profile.webp'}
            alt="profile"
            width={120}
            height={120}
            className="rounded"
          />
        </div>
      </div>
      <div className="h-[50px]" />
      <div className="mb-3">
        <h1 className="text-3xl fong-bold">Latest Posts</h1>
      </div>
      <div className="h-[30px]" />
      <div className="flex flex-col gap-6 mb-7">
        {posts.map((post, idx) => (
          <div key={idx}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
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
