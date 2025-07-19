'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { glassAppear } from '@/constants/animation';
import { useEffect, useState } from 'react';

interface GlassContainerProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  className?: string;
  animated?: boolean;
}

const GlassContainer = ({
  children,
  variant = 'primary',
  blur = 'md',
  opacity,
  className,
  animated = true,
}: GlassContainerProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'glass-medium';
      case 'secondary':
        return 'glass-light';
      case 'accent':
        return 'glass-heavy';
      default:
        return 'glass-medium';
    }
  };

  const getBlurClasses = () => {
    switch (blur) {
      case 'sm':
        return 'backdrop-blur-sm';
      case 'md':
        return 'backdrop-blur-md';
      case 'lg':
        return 'backdrop-blur-lg';
      case 'xl':
        return 'backdrop-blur-xl';
      default:
        return 'backdrop-blur-md';
    }
  };

  const baseClasses = cn(
    'rounded-xl',
    getVariantClasses(),
    getBlurClasses(),
    'will-change-transform',
    opacity && `opacity-${Math.round(opacity * 100)}`,
    className,
  );

  if (animated && isClient && !prefersReducedMotion) {
    return (
      <motion.div
        className={baseClasses}
        initial="hidden"
        animate="visible"
        variants={glassAppear}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{children}</div>;
};

export default GlassContainer;
