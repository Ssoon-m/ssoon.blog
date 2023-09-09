import Link from "next/link";
import { dateCompare, dateFormatter } from "@/lib/utils/date";
import { allPosts, type Post } from "@/lib/utils/post";
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
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
