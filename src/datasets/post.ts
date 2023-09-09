import {
  allPosts as _allPosts,
  type Post as _Post,
} from 'contentlayer/generated';
import { dateCompare } from '@/lib/utils/date';

export const getPosts = (sort: 'desc' | 'asc' = 'desc') => {
  if (sort === 'desc') {
    return _allPosts.sort((a, b) => dateCompare(b.date, a.date));
  }
  if (sort === 'asc') {
    return _allPosts.sort((a, b) => dateCompare(a.date, b.date));
  }
  return _allPosts;
};

export const getPost = (slug: string) => {
  return getPosts().find((post) => post._raw.flattenedPath === slug);
};

export type Post = _Post;
