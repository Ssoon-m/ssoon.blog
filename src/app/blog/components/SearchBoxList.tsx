'use client';
import SearchInput from '@/components/common/SearchInput';
import React from 'react';
import usePostsSearch from '../hooks/usePostsSearch';
import { Post } from '@/datasets/post';
import PostCardList from '@/components/post/PostCardList';

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
      <PostCardList posts={searchResults} />
    </>
  );
};

export default SearchBoxList;
