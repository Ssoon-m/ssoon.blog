import React from 'react';
import { getAllTags, getPostsByTag } from '@/datasets/post';
import { siteSEO } from '@/lib/seo';
import { notFound } from 'next/navigation';
import PostCardList from '@/components/post/PostCardList';

const TagsPage = ({ params }: { params: { slug: string } }) => {
  const tag = decodeURIComponent(params.slug);
  const posts = getPostsByTag(tag);
  return (
    <div className="pt-6">
      <h1 className="text-4xl font-bold"># {tag}</h1>
      <div className="pt-8">
        <PostCardList posts={posts} />
      </div>
    </div>
  );
};

export default TagsPage;

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
