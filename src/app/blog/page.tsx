import { getAllFilteredPosts } from '@/datasets/post';
import { siteSEO } from '@/lib/seo';
import type { Metadata } from 'next';
import SearchBoxList from './components/SearchBoxList';

const BlogPage = () => {
  const posts = getAllFilteredPosts();
  return (
    <div className="pt-6">
      <h1 className="text-4xl font-bold">Blog</h1>
      <div className="py-2 text-gray-700 dark:text-gray-300">
        학습한 내용들을 공유합니다.
      </div>
      <SearchBoxList posts={posts} />
    </div>
  );
};

export default BlogPage;

export const metadata: Metadata = siteSEO({
  title: 'Blog',
  description: '학습한 내용들을 공유합니다.',
  pathname: 'blog',
});
