'use client';

import PostCard from '@/components/post/PostCard';
import { springStagger, springFadeInSlideUp } from '@/constants/animation';
import { type Post } from '@/datasets/post';
import { motion } from 'framer-motion';

interface PostCardListProps {
  posts: Array<Post>;
}

const PostCardList = ({ posts }: PostCardListProps) => {
  return (
    <motion.div
      className="flex flex-col gap-6 mb-7"
      initial="hidden"
      animate="visible"
      variants={springStagger}
    >
      {posts.map((post, idx) => (
        <motion.div key={idx} variants={springFadeInSlideUp}>
          <PostCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PostCardList;
