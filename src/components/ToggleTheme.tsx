'use client';
import useToggleTheme from '@/hooks/useToggleTheme';
import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';
import { useIsMounted } from '@/hooks/useIsMounted';

const ToggleTheme = () => {
  const { isMounted } = useIsMounted();
  const { isThemeDark, toggleTheme } = useToggleTheme();
  return (
    <button
      aria-label="toggle theme button"
      className="p-1 text-yellow-400 w-8 h-8"
      onClick={toggleTheme}
    >
      {!isMounted ? null : isThemeDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ToggleTheme;
