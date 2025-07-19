'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { glassFocus } from '@/constants/animation';

interface GlassInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onAnimationStart' | 'onDragStart' | 'onDrag' | 'onDragEnd'
  > {
  variant?: 'default' | 'search' | 'minimal';
  icon?: React.ReactNode;
}

const GlassInput = ({
  variant = 'default',
  icon,
  className,
  ...props
}: GlassInputProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'default':
        return 'glass-light border-glass-light focus:glass-medium focus:border-glass-medium';
      case 'search':
        return 'glass-medium border-glass-medium focus:glass-heavy focus:border-glass-strong';
      case 'minimal':
        return 'bg-transparent border-glass-light focus:border-glass-medium';
      default:
        return 'glass-light border-glass-light focus:glass-medium focus:border-glass-medium';
    }
  };

  const baseClasses = cn(
    'w-full rounded-lg px-4 py-2',
    'backdrop-blur-md border',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/20',
    'placeholder-gray-500 dark:placeholder-gray-400',
    'text-gray-900 dark:text-gray-100',
    'will-change-transform',
    getVariantClasses(),
    icon && 'pl-10',
    className,
  );

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <motion.input
        className={baseClasses}
        whileFocus="focus"
        variants={glassFocus}
        {...props}
      />
    </div>
  );
};

export default GlassInput;
