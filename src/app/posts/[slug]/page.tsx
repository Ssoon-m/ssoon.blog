import { notFound } from 'next/navigation';
import {
  getNextPost,
  getPrevPost,
  getPostBySlug,
  getPostIndexBySlug,
  getPosts,
} from '@/datasets/post';
import PostContent from '@/components/post/PostContent';
import PostHeader from '@/components/post/PostHeader';
import PostFooter from '@/components/post/PostFooter';
import Giscus from '@/components/Giscus';

export const generateStaticParams = async () =>
  getPosts().map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }
  return { title: post.title };
};

const PostPage = ({ params }: { params: { slug: string } }) => {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const postIndex = getPostIndexBySlug(params.slug);
  const prevPost = getPrevPost(postIndex);
  const nextPost = getNextPost(postIndex);

  return (
    <div className="flex-1 flex flex-col py-8">
      <PostHeader
        title={post.title}
        date={post.date}
        readingTime={post.readingTime}
      />
      <div className="flex-1 pb-8">
        <PostContent
          postBodyCode={post.body.code}
          postBodyRaw={post.body.raw}
        />
      </div>
      <div className="py-4">
        <PostFooter prevPost={prevPost} nextPost={nextPost} />
      </div>
      <Giscus />
    </div>
  );
};

export default PostPage;
