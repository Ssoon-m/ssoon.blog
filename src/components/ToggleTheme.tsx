'use client';
import useToggleTheme from '@/hooks/useToggleTheme';
import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';
import { useIsMounted } from '@/hooks/useIsMounted';
import { motion } from 'framer-motion';

const ToggleTheme = () => {
  const { isMounted } = useIsMounted();
  const { isThemeDark, toggleTheme } = useToggleTheme();

  return (
    <button
      aria-label="toggle theme button"
      onClick={toggleTheme}
      className="relative ml-3 p-1 rounded-full glass-light hover:glass-medium transition-all duration-300 group"
    >
      <div className="relative w-12 h-6 bg-gradient-to-r from-orange-400 to-yellow-400 dark:from-slate-700 dark:to-slate-600 rounded-full shadow-inner transition-all duration-500 ease-in-out border border-orange-300/30 dark:border-slate-500/50">
        <motion.div
          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white dark:bg-gray-100 rounded-full shadow-lg flex items-center justify-center overflow-hidden border border-gray-200/50 dark:border-gray-300/30"
          animate={{
            x: isThemeDark ? 24 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        >
          <motion.div
            className="w-full h-full flex items-center justify-center"
            animate={{
              rotate: isThemeDark ? 360 : 0,
              scale: isThemeDark ? 0.8 : 1,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            {!isMounted ? null : isThemeDark ? (
              <MoonIcon
                width={12}
                height={12}
                className="text-slate-600 transition-colors duration-300"
              />
            ) : (
              <SunIcon
                width={12}
                height={12}
                className="text-orange-500 transition-colors duration-300"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-1 left-1 w-1 h-1 bg-white/30 rounded-full"
            animate={{
              opacity: isThemeDark ? 0 : 1,
              scale: isThemeDark ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-2 right-2 w-0.5 h-0.5 bg-white/20 rounded-full"
            animate={{
              opacity: isThemeDark ? 1 : 0,
              scale: isThemeDark ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
          <motion.div
            className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-white/20 rounded-full"
            animate={{
              opacity: isThemeDark ? 1 : 0,
              scale: isThemeDark ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-yellow-400/20 dark:from-slate-400/30 dark:to-slate-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
    </button>
  );
};

export default ToggleTheme;
