import { parseHeadersForTOC } from '@/lib/utils/markdown';
import { useMDXComponent } from 'next-contentlayer/hooks';
import TocSide from '../toc/TocSide';

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

interface PostContentProps {
  postBodyCode: string;
  postBodyRaw: string;
}

const PostContent = ({ postBodyCode, postBodyRaw }: PostContentProps) => {
  const MDXContent = useMDXComponent(postBodyCode);
  const toc = parseHeadersForTOC(postBodyRaw);

  return (
    <article>
      <div className="h-8 relative">
        <div className="absolute right-0">
          <div className="pl-12 fixed hidden lg:block max-w-[250px]">
            <TocSide tableOfContents={toc} />
          </div>
        </div>
      </div>
      <div className="ralative">
        <div className="flex-1 prose dark:prose-invert w-full max-w-none relative">
          <MDXContent components={{ a: BlankLink }} />
        </div>
      </div>
    </article>
  );
};

export default PostContent;
