'use client';
import { Post } from '@/datasets/post';
import SeriesCard from './SeriesCard';
import { motion } from 'framer-motion';
import { springFadeInSlideUp, springStagger } from '@/constants/animation';

interface SeiresCardListProps {
  seriesList: Post[];
}

const SeiresCardList = ({ seriesList }: SeiresCardListProps) => {
  return (
    <motion.div
      className="py-8 grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      animate="visible"
      variants={springStagger}
    >
      {seriesList.map((series) => (
        <motion.div
          key={series._id}
          className="h-full"
          variants={springFadeInSlideUp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <SeriesCard series={series} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SeiresCardList;
