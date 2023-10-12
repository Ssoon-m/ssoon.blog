import React from 'react';
import PostCard from '@/components/post/PostCard';
import { getAllTags, getPostsByTag } from '@/datasets/post';
import { siteSEO } from '@/lib/seo';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () =>
  getAllTags().map((tag) => ({ slug: decodeURIComponent(tag) }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const tag = decodeURIComponent(params.slug);
  const note = getPostsByTag(tag);
  if (!note) notFound();

  return siteSEO({
    title: `#${tag}`,
    pathname: `tags/${tag}`,
  });
};

const TagsPage = ({ params }: { params: { slug: string } }) => {
  const tag = decodeURIComponent(params.slug);
  const posts = getPostsByTag(tag);
  return (
    <div className="pt-6">
      <h1 className="text-4xl font-bold"># {tag}</h1>
      <div className="pt-8">
        <div className="flex flex-col gap-6 mb-7">
          {posts.map((post, idx) => (
            <div key={idx}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsPage;
