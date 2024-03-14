export const throttle = (callback: () => void, time: number) => {
  let waiting = true;
  return () => {
    if (!waiting) return;
    callback();
    waiting = false;
    setTimeout(() => (waiting = true), time);
  };
};
