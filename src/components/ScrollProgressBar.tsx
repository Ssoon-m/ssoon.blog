'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="origin-[0%] h-full bg-indigo-500"
      style={{ scaleX }}
    ></motion.div>
  );
};

export default ScrollProgressBar;
