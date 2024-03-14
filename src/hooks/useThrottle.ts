import { throttle } from '@/utils/throttle';
import { useCallback } from 'react';

const useThrottle = (callback: () => void, delay: number, deps?: unknown[]) => {
  return useCallback(throttle(callback, delay), [...(deps ?? [])]);
};

export default useThrottle;
