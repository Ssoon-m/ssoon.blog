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
    y: 45,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 40 },
  },
};
export const springFadeInSlideRight: Variants = {
  hidden: {
    opacity: 0,
    x: -45,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 40 },
  },
};
