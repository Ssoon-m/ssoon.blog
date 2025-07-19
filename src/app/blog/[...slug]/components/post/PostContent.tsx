import { parseHeadersForTOC } from '@/utils/markdown';
import { useMDXComponent } from 'next-contentlayer/hooks';
import FloatingControls from '@/components/post/FloatingControls';
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
    <>
      <article className="w-full">
        <div className="w-full prose dark:prose-invert max-w-none">
          <MDXContent components={{ a: BlankLink, img: NextImg }} />
        </div>
      </article>
      <FloatingControls tableOfContents={toc} />
    </>
  );
};

export default PostContent;
