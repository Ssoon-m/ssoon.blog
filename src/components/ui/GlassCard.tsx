'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { glassHover, glassAppear } from '@/constants/animation';
import { useEffect, useState } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  hover?: boolean;
  elevation?: 'low' | 'medium' | 'high';
  border?: boolean;
  className?: string;
  animated?: boolean;
}

const GlassCard = ({
  children,
  hover = true,
  elevation = 'medium',
  border = true,
  className,
  animated = true,
}: GlassCardProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getElevationClasses = () => {
    switch (elevation) {
      case 'low':
        return 'glass-light shadow-glass-light';
      case 'medium':
        return 'glass-medium shadow-glass-medium';
      case 'high':
        return 'glass-heavy shadow-glass-heavy';
      default:
        return 'glass-medium shadow-glass-medium';
    }
  };

  const baseClasses = cn(
    'rounded-xl p-6 backdrop-blur-md',
    'transition-all duration-300 ease-out',
    'will-change-transform',
    getElevationClasses(),
    !border && 'border-0',
    className,
  );

  if (animated && isClient) {
    return (
      <motion.div
        className={baseClasses}
        initial="hidden"
        animate="visible"
        variants={glassAppear}
        whileHover={hover ? 'hover' : undefined}
        {...(hover && {
          variants: {
            ...glassAppear,
            hover: glassHover.hover,
          },
        })}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        hover && 'hover:scale-[1.02] hover:-translate-y-1',
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
