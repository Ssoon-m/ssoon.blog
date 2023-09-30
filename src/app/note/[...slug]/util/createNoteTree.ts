import type { Note } from 'contentlayer/generated';
import type { TreeView } from '../types/aside-type';
import { dateCompare } from '@/lib/utils/date';

export const createTreeView = (
  notes: Note[],
  parentUrl: string,
): TreeView[] => {
  const depth = parentUrl.split('/').length;

  const filteredNotes = notes.filter(
    (note) =>
      note.noteUrl.split('/').length === depth + 1 &&
      note.noteUrl.startsWith(parentUrl),
  );

  const treeView = filteredNotes.map((note) => ({
    title: note.title,
    date: note.date,
    url: note.noteUrl,
    children: createTreeView(notes, note.noteUrl),
  }));
  return treeView;
};
