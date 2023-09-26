import { getAllNotes, getNotebySlug } from '@/datasets/note';
import { notFound } from 'next/navigation';
import { createTreeView } from './util/createNoteTree';

export const generateStaticParams = async () =>
  getAllNotes().map((note) => ({ slug: note._raw.flattenedPath.split('/') }));

export const generateMetadata = ({
  params,
}: {
  params: { slug: string[] };
}) => {
  const noteSlug = params.slug.join('/');
  const note = getNotebySlug(`note/${noteSlug}`);
  if (!note) notFound();
  return { title: note.title };
};

const NotePage = ({ params }: { params: { slug: string[] } }) => {
  const noteSlug = params.slug.join('/');
  const note = getNotebySlug(`note/${noteSlug}`);
  if (!note) notFound();
  const notes = getAllNotes();
  const treeView = createTreeView(notes, 'note');
  return <div>notePage</div>;
};

export default NotePage;
