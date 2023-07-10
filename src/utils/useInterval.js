import { useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function triggerFunction() {
      savedCallback.current();
    }
    let id;
    if (delay !== null && delay !== undefined) {
      let id = setInterval(triggerFunction, delay);
      return () => clearInterval(id);
    } else {
      return () => clearInterval(id);
    }
  }, [delay]);
}
