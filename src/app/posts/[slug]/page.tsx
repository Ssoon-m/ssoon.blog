import { dateFormatter } from '@/lib/utils/date';
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/datasets/post';
import { useMDXComponent } from 'next-contentlayer/hooks';

const BlankLink = (props: any) => {
  if (props.className === 'anchor') {
    return <a {...props} />;
  } else {
    return (
      <a
        className="text-indigo-500 no-underline"
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

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = getPost(params.slug);
  if (!post) notFound();
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="py-8">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {dateFormatter(post.date, 'MM D, YYYY')}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <div className="prose dark:prose-dark">
        <MDXContent components={{ a: BlankLink }} />
      </div>
    </article>
  );
};

export default PostLayout;
