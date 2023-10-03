import { useTheme } from 'next-themes';

export const useGetCurrentTheme = () => {
  const { theme, resolvedTheme } = useTheme();
  return theme === 'light' || resolvedTheme === 'light' ? 'light' : 'dark';
};
