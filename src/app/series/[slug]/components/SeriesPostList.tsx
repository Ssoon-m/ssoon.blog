'use client';

import { motion } from 'framer-motion';
import { type Post } from '@/datasets/post';
import { springStagger, glassAppear } from '@/constants/animation';
import SeriesPostCard from './SeriesPostCard';

interface SeriesPostListProps {
  posts: Array<Post>;
}

const SeriesPostList = ({ posts }: SeriesPostListProps) => {
  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={springStagger}
    >
      {posts.map((post, idx) => (
        <motion.div key={post._id} variants={glassAppear}>
          <SeriesPostCard post={post} index={idx} totalPosts={posts.length} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SeriesPostList;
