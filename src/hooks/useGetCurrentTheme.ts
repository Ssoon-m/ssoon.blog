import { useTheme } from 'next-themes';

export const useGetCurrentTheme = () => {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === 'dark' ? 'dark' : 'light';
};
