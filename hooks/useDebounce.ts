import { useCallback, useRef } from "react";

export const useDebounce = (callback: Function, delay: number) => {
  const timer = useRef<null | ReturnType<typeof setTimeout>>(null);

  const debounceCallback = useCallback(
    (...args: any) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
  return debounceCallback;
};
