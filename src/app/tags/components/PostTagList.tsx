'use client';
import PostTag from '@/components/post/PostTag';
import { springFadeInSlideRight, springStagger } from '@/constants/animation';
import { motion } from 'framer-motion';

interface PostTagListProps {
  tags: Array<[string, number]>;
}

const PostTagList = ({ tags }: PostTagListProps) => {
  return (
    <motion.ul
      className="py-4 flex gap-2 flex-wrap"
      initial="hidden"
      animate="visible"
      variants={springStagger}
    >
      {tags.map(([key, value]) => (
        <motion.li
          key={key}
          className="h-fit"
          variants={springFadeInSlideRight}
        >
          <PostTag tag={key} size="large">
            <span>{key}&nbsp;</span>
            <span>({value})</span>
          </PostTag>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default PostTagList;
