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

export const getMainPosts = () => {
  return _allPosts.slice(0, 5).sort((a, b) => dateCompare(b.date, a.date));
};

export const getPostBySlug = (slug: string) => {
  return getPosts().find((post) => post._raw.flattenedPath === slug);
};

export const getPostIndexBySlug = (slug: string) => {
  return getPosts().findIndex((post) => post._raw.flattenedPath === slug);
};

export const getPrevPost = (index: number): _Post | null => {
  return getPosts()[index + 1] ?? null;
};
export const getNextPost = (index: number): _Post | null => {
  return getPosts()[index - 1] ?? null;
};

export const getTagsOfPosts = () => {
  return Array.from(
    _allPosts.reduce((acc, post) => {
      post.tags.forEach((tag) =>
        acc.has(tag) ? acc.set(tag, acc.get(tag)! + 1) : acc.set(tag, 1),
      );
      return acc;
    }, new Map<string, number>()),
  );
};

export const getPostByTag = (tag: string) => {
  return _allPosts.filter((post) => post.tags.some((_tag) => _tag === tag));
};

export type Post = _Post;
