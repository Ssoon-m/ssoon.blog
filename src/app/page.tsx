import Link from "next/link";
import { dateCompare, dateFormatter } from "@/lib/utils/date";
import { allPosts, type Post } from "@/lib/utils/post";
import Image from "next/image";

function PostCard(post: Post) {
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
        {dateFormatter(post.date, "MM D, YYYY")}
      </time>
    </div>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) => dateCompare(b.date, a.date));

  return (
    <div>
      <div className="flex items-center sm:justify-between flex-wrap flex-col sm:flex-row">
        <div className="order-2 sm:order-1 text-center sm:text-start mt-2 sm:mt-0">
          <h1 className="text-2xl font-bold">권순민</h1>
          <h3 className="text-lg text-gray-400">프론트엔드 개발자</h3>
          <p className="text-gray-600">
            좋은 사용자 경험을 위해 학습하고 기록합니다.😄
          </p>
        </div>
        <div className="relative order-1 sm:order-2">
          <Image
            src={"/my-profile.webp"}
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
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
      <div className="hover:-translate-y-[1px] transform duration-200 inline-block">
        <Link
          href="/blog"
          className="text-gray-500 hover:text-gray-700 align-middle"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
