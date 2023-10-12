import { allPosts, type Post as _Post } from 'contentlayer/generated';
import { dateCompare } from '@/lib/utils/date';

export const getAllPosts = (sort: 'desc' | 'asc' = 'desc') => {
  if (sort === 'desc') {
    return allPosts.sort((a, b) => dateCompare(b.date, a.date));
  }
  if (sort === 'asc') {
    return allPosts.sort((a, b) => dateCompare(a.date, b.date));
  }
  return allPosts;
};

export const getMainPosts = () => {
  return allPosts.slice(0, 5).sort((a, b) => dateCompare(b.date, a.date));
};

export const getPostBySlug = (slug: string) => {
  return getAllPosts().find((post) => post._raw.flattenedPath === slug);
};

export const getPostIndexBySlug = (slug: string) => {
  return getAllPosts().findIndex((post) => post._raw.flattenedPath === slug);
};

export const getPrevPost = (index: number): _Post | null => {
  return getAllPosts()[index + 1] ?? null;
};
export const getNextPost = (index: number): _Post | null => {
  return getAllPosts()[index - 1] ?? null;
};

export const getAllTags = () => {
  return Array.from(
    allPosts.reduce((acc, post) => {
      post.tags.forEach((tag) => acc.add(tag));
      return acc;
    }, new Set<string>([])),
  );
};

export const getTagsOfPosts = () => {
  return Array.from(
    allPosts.reduce((acc, post) => {
      post.tags.forEach((tag) =>
        acc.has(tag) ? acc.set(tag, acc.get(tag)! + 1) : acc.set(tag, 1),
      );
      return acc;
    }, new Map<string, number>()),
  );
};

export const getPostsByTag = (tag: string) => {
  return allPosts.filter((post) => post.tags.some((_tag) => _tag === tag));
};

export type Post = _Post;
