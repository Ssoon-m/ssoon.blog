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

export const getAllFilteredPosts = (sort: 'desc' | 'asc' = 'desc') => {
  const filteredAllPosts = allPosts.filter(
    (post) => !post._raw.sourceFilePath.endsWith('/index.mdx'),
  );

  if (sort === 'desc') {
    return filteredAllPosts.sort((a, b) => dateCompare(b.date, a.date));
  }
  if (sort === 'asc') {
    return filteredAllPosts.sort((a, b) => dateCompare(a.date, b.date));
  }
  return filteredAllPosts;
};

export const getMainPosts = () => {
  return getAllFilteredPosts()
    .slice(0, 5)
    .sort((a, b) => dateCompare(b.date, a.date));
};

export const getPostBySlug = (slug: string) => {
  return getAllFilteredPosts().find((post) => post._raw.flattenedPath === slug);
};

export const getPostIndexBySlug = (slug: string) => {
  return getAllFilteredPosts().findIndex(
    (post) => post._raw.flattenedPath === slug,
  );
};

export const getPrevPost = (index: number): _Post | null => {
  return getAllFilteredPosts()[index + 1] ?? null;
};
export const getNextPost = (index: number): _Post | null => {
  return getAllFilteredPosts()[index - 1] ?? null;
};

export const getAllTags = () => {
  return Array.from(
    getAllFilteredPosts().reduce((acc, post) => {
      post.tags.forEach((tag) => acc.add(tag));
      return acc;
    }, new Set<string>([])),
  );
};

export const getTagsOfPosts = () => {
  return Array.from(
    getAllFilteredPosts().reduce((acc, post) => {
      post.tags.forEach((tag) =>
        acc.has(tag) ? acc.set(tag, acc.get(tag)! + 1) : acc.set(tag, 1),
      );
      return acc;
    }, new Map<string, number>()),
  );
};

export const getPostsByTag = (tag: string) => {
  return getAllFilteredPosts().filter((post) =>
    post.tags.some((_tag) => _tag === tag),
  );
};

export const getSeriesBySlug = (slug: string) => {
  const filteredSeries = getAllPosts().filter((post) =>
    post._raw.sourceFilePath.endsWith('/index.mdx'),
  );
  const findSeries = filteredSeries.find((series) =>
    slug.includes(series._raw.flattenedPath),
  );
  if (!findSeries) return;

  const seriesList = getAllPosts('asc').filter(
    (post) =>
      !post._raw.sourceFilePath.endsWith('/index.mdx') &&
      post._raw.flattenedPath.includes(findSeries._raw.flattenedPath),
  );

  const currentSeriesIndex = seriesList.findIndex(
    (series) => series._raw.flattenedPath === slug,
  );

  return { currentSeries: findSeries, seriesList, currentSeriesIndex };
};

export const getAllSeries = () => {
  const filteredSeries = getAllPosts().filter((post) =>
    post._raw.sourceFilePath.endsWith('/index.mdx'),
  );

  console.log(
    'filteredSeries',
    filteredSeries.map((sereis) => sereis._raw.flattenedPath),
  );
  return filteredSeries;
};

export type Post = _Post;
