import type { Note } from 'contentlayer/generated';

type TreeView = {
  title: string;
  date: string;
  url: string;
  children: TreeView[];
};

export const createTreeView = (
  notes: Note[],
  parentUrl: string,
): TreeView[] => {
  const treeViewNodes: TreeView[] = [];

  notes.forEach((note) => {
    if (note.noteUrl.startsWith(parentUrl)) {
      const remainingUrl = note.noteUrl.slice(parentUrl.length + 1);
      const nextSlashIndex = remainingUrl.indexOf('/');

      const currentUrlSegment =
        nextSlashIndex !== -1
          ? remainingUrl.slice(0, nextSlashIndex)
          : remainingUrl;

      if (!treeViewNodes.find((node) => node.title === currentUrlSegment)) {
        const newNode: TreeView = {
          title: note.title,
          date: note.date,
          url: `/${parentUrl}/${currentUrlSegment}`,
          children: createTreeView(notes, `${parentUrl}/${currentUrlSegment}`),
        };
        treeViewNodes.push(newNode);
      }
    }
  });

  return treeViewNodes;
};
