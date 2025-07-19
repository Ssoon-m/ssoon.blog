import { parseHeadersForTOC } from '@/utils/markdown';
import { useMDXComponent } from 'next-contentlayer/hooks';
import FloatingControls from '@/components/post/FloatingControls';

const BlankLink = (props: any) => {
  if (props.className === 'anchor') {
    return <a {...props} />;
  } else {
    return (
      <a
        className="text-indigo-500 underline hover:text-indigo-400"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  }
};

interface NoteContentProps {
  postBodyCode: string;
  postBodyRaw: string;
}

const NoteContent = ({ postBodyCode, postBodyRaw }: NoteContentProps) => {
  const MDXContent = useMDXComponent(postBodyCode);
  const toc = parseHeadersForTOC(postBodyRaw);

  return (
    <>
      <article className="pt-7">
        <div className="w-full prose dark:prose-invert max-w-none">
          <MDXContent components={{ a: BlankLink }} />
        </div>
      </article>
      <FloatingControls tableOfContents={toc} />
    </>
  );
};

export default NoteContent;
