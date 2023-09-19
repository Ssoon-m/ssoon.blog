import { dateFormatter } from '@/lib/utils/date';
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/datasets/post';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { parseHeadersForTOC } from '@/lib/utils/markdown';
import TocSide from '@/components/toc/TocSide';

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

export const generateStaticParams = async () =>
  getPosts().map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = getPost(params.slug);
  if (!post) {
    notFound();
  }
  return { title: post.title };
};

const PostPage = ({ params }: { params: { slug: string } }) => {
  const post = getPost(params.slug);
  if (!post) notFound();
  const MDXContent = useMDXComponent(post.body.code);
  const headers = parseHeadersForTOC(post.body.raw);
  return (
    <article className="py-8">
      <div className="text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {dateFormatter(post.date, 'MM D, YYYY')}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <div className="h-8 relative">
        <div className="absolute right-0">
          <div className="pl-12 fixed hidden lg:block max-w-[250px]">
            <TocSide tableOfContents={headers} />
          </div>
        </div>
      </div>
      <div className="ralative">
        <div className="flex-1 prose dark:prose-invert w-full max-w-none relative">
          <MDXContent components={{ a: BlankLink }} />
        </div>
      </div>
      <div className="h-[500px]"></div>
    </article>
  );
};

export default PostPage;
