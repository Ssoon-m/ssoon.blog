import SearchInput from '@/components/common/SearchInput';
import PostCard from '@/components/post/PostCard';
import { getPosts } from '@/datasets/post';

const BlogPage = () => {
  const posts = getPosts();

  return (
    <div>
      <h1 className="text-4xl font-bold">Blog</h1>
      <div className="text-gray-700 dark:text-gray-300">
        학습한 내용들을 공유합니다.
      </div>
      <div className="py-8">
        <SearchInput type="text" placeholder="검색 내용을 입력해주세요" />
      </div>
      <div className="flex flex-col gap-16 sm:gap-6 mb-7">
        {posts.map((post, idx) => (
          <div key={idx}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
