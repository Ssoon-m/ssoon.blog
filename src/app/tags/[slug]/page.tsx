import PostCard from '@/components/post/PostCard';
import { getPostByTag, getTagsOfPosts } from '@/datasets/post';
import React from 'react';

const TagsPage = ({ params }: { params: { slug: string } }) => {
  const tag = decodeURIComponent(params.slug);
  const posts = getPostByTag(tag);
  return (
    <div>
      <h1 className="text-4xl font-bold"># {tag}</h1>
      <div className="pt-8">
        <div className="flex flex-col gap-16 sm:gap-6 mb-7">
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
