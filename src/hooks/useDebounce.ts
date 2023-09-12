import React, { useCallback } from 'react';

const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};

export const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
  deps: unknown[],
) => {
  const debounceCallback = useCallback(
    debounce((...args: T) => callback(...args), delay),
    [...deps],
  );
  return debounceCallback;
};
