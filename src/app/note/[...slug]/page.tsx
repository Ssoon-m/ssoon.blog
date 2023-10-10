import ArticleJsonLd from '@/components/ArticleJsonLd';
import ScrollTopButton from '@/components/ScrollTopButton';
import { siteData } from '@/constants/my-site';
import { getAllNotes, getNotebySlug } from '@/datasets/note';
import { articleSEO } from '@/lib/seo';
import { notFound } from 'next/navigation';
import AsideCategory from './components/AsideCategory';
import NoteContent from './components/NoteContent';
import NoteHeader from './components/NoteHeader';
import TopNavCategory from './components/TopNavCategory';
import { createTreeView } from './util/createNoteTree';

export const generateStaticParams = async () =>
  getAllNotes().map((note) => ({
    slug: note._raw.flattenedPath.replace(/note\//i, '').split('/'),
  }));

export const generateMetadata = ({
  params,
}: {
  params: { slug: string[] };
}) => {
  const noteSlug = params.slug.join('/');
  const note = getNotebySlug(`note/${noteSlug}`);
  if (!note) notFound();

  return articleSEO({
    title: note.title,
    description: siteData.notePageDescription,
    pathname: note.noteUrl,
    publishedTime: note.date,
    images: [siteData.siteImage],
    tags: [],
  });
};

const NotePage = ({ params }: { params: { slug: string[] } }) => {
  const noteSlug = params.slug.join('/');
  const note = getNotebySlug(`note/${noteSlug}`);
  if (!note) notFound();
  const notes = getAllNotes('asc');
  const treeView = createTreeView(notes, 'note');
  return (
    <>
      <ArticleJsonLd
        headline={note.title}
        datePublished={note.date}
        description={siteData.notePageDescription}
        pathname={note.noteUrl}
      />
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="hidden md:block shrink-0 h-full sticky top-14 p-2 w-[300px]">
          <AsideCategory
            categories={treeView}
            currentPath={`note/${noteSlug}`}
          />
        </div>
        <div className="block md:hidden">
          <TopNavCategory
            categories={treeView}
            currentPath={`note/${noteSlug}`}
          />
        </div>
        <div className="w-full p-8 md:pt-12 pt-20 md:border-l md:border-gray-100 md:dark:border-gray-700">
          <NoteHeader title={note.title} date={note.date} />
          <NoteContent
            postBodyCode={note.body.code}
            postBodyRaw={note.body.raw}
          />
        </div>
      </div>
      <ScrollTopButton />
    </>
  );
};

export default NotePage;
