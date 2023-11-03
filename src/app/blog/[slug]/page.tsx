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
import Image from 'next/image';
import PostTag from '@/components/post/PostTag';
import ScrollProgressBar from '@/components/ScrollProgressBar';

export const generateStaticParams = async () =>
  getAllPosts().map((post) => ({
    slug: post._raw.flattenedPath.replace(/blog\//i, ''),
  }));

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
      <div className="fixed top-0 left-0 right-0 z-50 h-1 w-full">
        <ScrollProgressBar />
      </div>
      <div className="flex-1 flex flex-col py-8">
        <PostHeader
          title={post.title}
          date={post.date}
          readingTime={post.readingTime}
        />
        {post.thumbnailUrl && (
          <div className="flex justify-center items-center my-10 relative w-full h-auto">
            <Image
              className="object-contain"
              src={post.thumbnailUrl}
              alt="post thumbnail image"
              width={550}
              height={550}
              priority
            />
          </div>
        )}
        <div className="flex-1 pb-8 border-b border-gray-100 dark:border-gray-700">
          <PostContent
            postBodyCode={post.body.code}
            postBodyRaw={post.body.raw}
          />
          <div className="pt-6 flex flex-start items-center flex-wrap gap-2">
            {post.tags.map((tag, i) => (
              <PostTag key={i} tag={tag} size="large">
                {tag}
              </PostTag>
            ))}
          </div>
        </div>
        <div className="py-4">
          <PostFooter prevPost={prevPost} nextPost={nextPost} />
        </div>
        <Giscus />
      </div>
      <ScrollTopButton />
    </>
  );
};

export default PostPage;
