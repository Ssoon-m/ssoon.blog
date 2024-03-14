import { parseHeadersForTOC } from '@/utils/markdown';
import { useMDXComponent } from 'next-contentlayer/hooks';
import TocSide from '@/components/post/TocSide';

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
    <article className="pt-7">
      <div className="flex justify-between relative">
        <div className="flex-1 prose dark:prose-invert w-full max-w-none relative">
          <MDXContent components={{ a: BlankLink }} />
        </div>
        <div className="pl-6 hidden lg:block min-w-[200px] max-w-[200px]">
          <div className="sticky top-[80px] mt-[_-50px] h-fit">
            <TocSide tableOfContents={toc} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default NoteContent;
