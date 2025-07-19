'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { glassFocus } from '@/constants/animation';

interface GlassButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDrag' | 'onDragEnd'
  > {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glassEffect?: boolean;
  children: React.ReactNode;
}

const GlassButton = ({
  variant = 'primary',
  size = 'md',
  glassEffect = true,
  className,
  children,
  ...props
}: GlassButtonProps) => {
  const getVariantClasses = () => {
    if (!glassEffect) {
      switch (variant) {
        case 'primary':
          return 'bg-blue-600 hover:bg-blue-700 text-white';
        case 'secondary':
          return 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100';
        case 'ghost':
          return 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100';
        default:
          return 'bg-blue-600 hover:bg-blue-700 text-white';
      }
    }

    switch (variant) {
      case 'primary':
        return 'glass-medium text-gray-900 dark:text-gray-100 hover:glass-heavy';
      case 'secondary':
        return 'glass-light text-gray-700 dark:text-gray-200 hover:glass-medium';
      case 'ghost':
        return 'bg-transparent hover:glass-light text-gray-900 dark:text-gray-100 border-glass-light';
      default:
        return 'glass-medium text-gray-900 dark:text-gray-100 hover:glass-heavy';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const baseClasses = cn(
    'rounded-lg font-medium',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'will-change-transform',
    glassEffect && 'backdrop-blur-md border',
    getVariantClasses(),
    getSizeClasses(),
    className,
  );

  return (
    <motion.button
      className={baseClasses}
      whileTap={{ scale: 0.95 }}
      whileFocus="focus"
      variants={glassFocus}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlassButton;
