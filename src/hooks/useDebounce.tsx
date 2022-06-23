import { useState, useEffect } from "react";

// When the user inputs/changes a search value it first applies a time out, then runs the provided callback function
export function useDebounce(
  value: string,
  timeout: number,
  callback: Function
) {
  const [timer, setTimer] = useState<number>();

  const clearTimer = () => {
    if (timer) clearTimeout(timer);
  };

  useEffect(() => {
    clearTimer();

    if (value && callback) {
      const newTimer = setTimeout(callback, timeout);
      setTimer(newTimer);
    }
  }, [value]);
}
