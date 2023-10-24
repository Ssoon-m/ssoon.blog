'use client';
import SearchInput from '@/components/common/SearchInput';
import React from 'react';
import usePostsSearch from '../hooks/usePostsSearch';
import PostCard from '@/components/post/PostCard';
import { Post } from '@/datasets/post';
import { motion } from 'framer-motion';
import { springFadeInSlideUp, springStagger } from '@/constants/animation';

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
      <motion.div
        className="flex flex-col gap-6 mb-7"
        initial="hidden"
        animate="visible"
        variants={springStagger}
      >
        {searchResults.map((post, idx) => (
          <motion.div key={idx} variants={springFadeInSlideUp}>
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default SearchBoxList;
