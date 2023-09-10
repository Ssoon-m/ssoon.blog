import { useTheme } from 'next-themes';

const useToggleTheme = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const isThemeDark = resolvedTheme === 'dark';
  const toggleTheme = () => {
    isThemeDark ? setTheme('light') : setTheme('dark');
  };

  return {
    isThemeDark,
    toggleTheme,
  };
};

export default useToggleTheme;
