import Link from 'next/link';
import { Post } from '@/datasets/post';
import { dateFormatter } from '@/lib/utils/date';
import Image from 'next/image';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <Link href={post.url}>
      <div className="flex flex-col sm:flex-row gap-6 justify-start items-center h-full">
        <div className="h-full w-full sm:w-3/12 aspect-[5/3] relative shrink-0 rounded overflow-hidden">
          <Image src={'/temp.png'} fill alt="tumbnail-image" />
        </div>
        <div className="w-full">
          <h2 className="text-2xl font-medium">{post.title}</h2>
          <h4 className="text-l mb-2 text-gray-600">{post.description}</h4>
          <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center flex-wrap gap-2">
            <div className="flex flex-start items-center flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <div
                  className="rounded-lg px-2 py-[2px] bg-gray-100 text-sm text-indigo-500 shrink-0 hover:bg-gray-200"
                  key={i}
                >
                  {tag}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400">
              {dateFormatter(post.date, 'YYYY-MM-DD')} · {post.readingTime} min
              read
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
