import { Variants } from 'framer-motion';

export const springStagger: Variants = {
  visible: {
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
  hidden: {},
};

export const springFadeInSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 40 },
  },
};
