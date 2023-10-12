import BasicLayout from '@/components/layout/BasicLayout';
import PostTag from '@/components/post/PostTag';
import { getTagsOfPosts } from '@/datasets/post';
import { siteSEO } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';

const TagsPage = () => {
  const tags = getTagsOfPosts();
  const tagsCount = tags.reduce((acc, [_, count]) => acc + count, 0);

  return (
    <div className="pt-6">
      <h1 className="text-4xl font-bold">Tags ({tagsCount})</h1>
      <div className="py-2 text-gray-700 dark:text-gray-300">
        게시글에 사용된 태그들을 모아서 보여줍니다.
      </div>

      <div className="py-4 flex gap-2 flex-wrap">
        {tags.map(([key, value]) => (
          <PostTag key={key} tag={key} size="large">
            <span>{key}&nbsp;</span>
            <span>({value})</span>
          </PostTag>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;

export const metadata: Metadata = siteSEO({
  title: 'Tag',
  description: '게시글에 사용된 태그들을 모아서 보여줍니다.',
  pathname: 'tag',
});
