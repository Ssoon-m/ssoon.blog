'use client';

import PostCard from '@/components/post/PostCard';
import { springStagger, springFadeInSlideUp } from '@/constants/animation';
import { type Post } from '@/datasets/post';
import { motion } from 'framer-motion';

interface PostCardListProps {
  posts: Array<Post>;
  displayNumberedList?: boolean;
}

const PostCardList = ({ posts, displayNumberedList }: PostCardListProps) => {
  return (
    <motion.div
      className="flex flex-col gap-6 mb-7"
      initial="hidden"
      animate="visible"
      variants={springStagger}
    >
      {posts.map((post, idx) => (
        <motion.div key={idx} variants={springFadeInSlideUp}>
          <div className="w-full flex gap-3 items-start">
            {displayNumberedList && (
              <div className="pt-[0.45em] text-xl text-gray-600 select-none">
                {idx + 1}.
              </div>
            )}
            <PostCard post={post} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PostCardList;
