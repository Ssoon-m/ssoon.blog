import SearchBoxList from './components/SearchBoxList';
import { getPosts } from '@/datasets/post';

const BlogPage = () => {
  const posts = getPosts();
  return (
    <div>
      <h1 className="text-4xl font-bold">Blog</h1>
      <div className="text-gray-700 dark:text-gray-300">
        학습한 내용들을 공유합니다.
      </div>
      <SearchBoxList posts={posts} />
    </div>
  );
};

export default BlogPage;