import { parseHeadersForTOC } from '@/utils/markdown';
import { useMDXComponent } from 'next-contentlayer/hooks';
import TocSide from '@/components/post/TocSide';
import cloudinaryLoader from 'my-loader';

const BlankLink = (props: any) => {
  if (props.className === 'anchor') {
    return <a {...props} />;
  } else {
    return (
      <a
        className="text-indigo-500 underline hover:text-indigo-400 break-words break-keep"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  }
};

const NextImg = (props: any) => {
  const { src, alt } = props;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="mx-auto object-contain"
      src={cloudinaryLoader({ src })}
      alt={alt}
    />
  );
};

interface PostContentProps {
  postBodyCode: string;
  postBodyRaw: string;
}

const PostContent = ({ postBodyCode, postBodyRaw }: PostContentProps) => {
  const MDXContent = useMDXComponent(postBodyCode);
  const toc = parseHeadersForTOC(postBodyRaw);

  return (
    <article className="w-full flex flex-nowrap gap-5">
      <div className="w-full prose dark:prose-invert max-w-3xl">
        <MDXContent components={{ a: BlankLink, img: NextImg }} />
      </div>
      <div className="hidden lg:block min-w-[200px] max-w-[250px]">
        <div className="sticky top-[80px] h-fit">
          <TocSide tableOfContents={toc} />
        </div>
      </div>
    </article>
  );
};

export default PostContent;
