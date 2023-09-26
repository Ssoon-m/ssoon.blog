import { notFound } from 'next/navigation';
import {
  getNextPost,
  getPrevPost,
  getPostBySlug,
  getPostIndexBySlug,
  getAllPosts,
} from '@/datasets/post';
import PostContent from './components/post/PostContent';
import PostHeader from './components/post/PostHeader';
import PostFooter from './components/post/PostFooter';
import Giscus from '@/components/Giscus';
import ScrollTopButton from '@/components/ScrollTopButton';
import { articleSEO } from '@/lib/seo';
import ArticleJsonLd from '@/components/ArticleJsonLd';

export const generateStaticParams = async () =>
  getAllPosts().map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = getPostBySlug(`blog/${params.slug}`);
  if (!post) {
    notFound();
  }
  return articleSEO({
    title: post.title,
    description: post.description,
    pathname: post.postUrl,
    publishedTime: post.date,
    images: [post.thumbnailUrl],
    tags: post.tags,
  });
};

const PostPage = ({ params }: { params: { slug: string } }) => {
  const post = getPostBySlug(`blog/${params.slug}`);
  if (!post) notFound();
  const postIndex = getPostIndexBySlug(`blog/${params.slug}`);
  const prevPost = getPrevPost(postIndex);
  const nextPost = getNextPost(postIndex);

  return (
    <>
      <ArticleJsonLd
        headline={post.title}
        datePublished={post.date}
        description={post.description}
        pathname={post.postUrl}
        image={post.thumbnailUrl}
      />
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
        <div className="fixed bottom-4 right-4">
          <ScrollTopButton />
        </div>
      </div>
    </>
  );
};

export default PostPage;
