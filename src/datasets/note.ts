import { dateCompare } from '@/utils/date';
import { allNotes } from 'contentlayer/generated';

export const getAllNotes = (sort: 'desc' | 'asc' = 'desc') => {
  if (sort === 'desc') {
    return allNotes.sort((a, b) => dateCompare(b.date, a.date));
  }
  if (sort === 'asc') {
    return allNotes.sort((a, b) => dateCompare(a.date, b.date));
  }
  return allNotes;
};

export const getNotebySlug = (slug: string) => {
  return getAllNotes().find((note) => note._raw.flattenedPath === slug);
};
