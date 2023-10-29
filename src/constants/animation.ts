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

export const fullSlideInMenu: Variants = {
  closed: {
    transform: 'translate(0%, -100%)',
    top: 0,
    willChange: 'transform',
  },
  open: {
    transform: 'translate(0%,0%)',
    top: 0,
    transition: { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.35 },
    willChange: 'transform',
  },
};

export const fullSlideInHeader: Variants = {
  closed: {
    transform: 'translate(0%, -100%)',
    top: 0,
    willChange: 'transform',
  },
  open: {
    transform: 'translate(0%,0%)',
    top: 0,
    transition: { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.35 },
    willChange: 'transform',
  },
};

export const fadeInSlideUpDelay: Variants = {
  closed: {
    y: 60,
    opacity: 0,
  },
  open: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.35, ease: [0.08, 0.65, 0.53, 0.96] },
  },
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
