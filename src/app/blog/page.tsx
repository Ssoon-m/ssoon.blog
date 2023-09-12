import SearchInput from '@/components/common/SearchInput';

const BlogPage = () => {
  return (
    <div>
      <h1 className="text-3xl">Blog</h1>
      <div>학습한 내용들을 공유합니다.</div>
      <SearchInput type="text" placeholder="검색 내용을 입력해주세요" />
    </div>
  );
};

export default BlogPage;
