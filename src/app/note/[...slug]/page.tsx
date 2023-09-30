import { getAllNotes, getNotebySlug } from '@/datasets/note';
import { notFound } from 'next/navigation';
import { createTreeView } from './util/createNoteTree';
import AsideCategory from './components/AsideCategory';
import PostContent from '@/app/blog/[slug]/components/post/PostContent';
import NoteHeader from './components/NoteHeader';

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
  const notes = getAllNotes('asc');
  const treeView = createTreeView(notes, 'note');
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex justify-between">
        <div className="shrink-0 h-full sticky top-14 p-2 w-[300px]">
          <AsideCategory
            categories={treeView}
            currentPath={`note/${noteSlug}`}
          />
        </div>
        <div className="w-full p-12 border-l border-gray-100 dark:border-gray-700">
          <NoteHeader title={note.title} date={note.date} />
          <PostContent
            postBodyCode={note.body.code}
            postBodyRaw={note.body.raw}
          />
        </div>
      </div>
    </div>
  );
};

export default NotePage;
