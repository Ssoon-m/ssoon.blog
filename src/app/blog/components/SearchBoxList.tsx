'use client';
import SearchInput from '@/components/common/SearchInput';
import React from 'react';
import usePostsSearch from '../hooks/usePostsSearch';
import PostCard from '@/components/post/PostCard';
import { Post } from '@/datasets/post';

interface SearchProps {
  posts: Post[];
}
const SearchBoxList = ({ posts }: SearchProps) => {
  const { searchResults, handleSearch } = usePostsSearch(posts);
  return (
    <>
      <div className="py-8">
        <SearchInput
          type="text"
          placeholder="검색 내용을 입력해주세요"
          onChange={(e) => handleSearch(e.currentTarget.value)}
        />
      </div>
      <div className="flex flex-col gap-16 sm:gap-6 mb-7">
        {searchResults.map((post, idx) => (
          <div key={idx}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchBoxList;
