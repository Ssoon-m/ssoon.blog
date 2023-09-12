import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Post } from '@/datasets/post';

const usePostsSearch = (searchList: Post[]) => {
  const [query, setQuery] = useState('');
  const setSearchQuery = (value: string) => {
    setQuery(value);
  };
  const handleSearch = useDebounce(setSearchQuery, 150, []);
  const searchResults = searchList.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );
  return { searchResults, handleSearch };
};

export default usePostsSearch;
