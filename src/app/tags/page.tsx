import { getTagsOfPosts } from '@/datasets/post';
import Link from 'next/link';

const TagsPage = () => {
  const tags = getTagsOfPosts();
  const tagsCount = tags.reduce((acc, [_, count]) => acc + count, 0);

  return (
    <div>
      <h1 className="text-4xl font-bold">Tags ({tagsCount})</h1>
      <div className="text-gray-700 dark:text-gray-300">
        전체 태그를 모아서 봅니다.
      </div>

      <div className="py-4 flex gap-2 flex-wrap">
        {tags.map(([key, value]) => (
          <Link
            key={key}
            href={`/tags/${key}`}
            className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-indigo-500 dark:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <span>{key}&nbsp;</span>
            <span>({value})</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;