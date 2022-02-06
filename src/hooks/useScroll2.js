// this was supposed to be a more efficient hook, but it's does not seem to be. Test more...
import { RefObject, useEffect } from 'react';

import useRafState from './useRafState';
import { off, on } from './misc/util';


const useScroll2 = (ref) => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
      console.error('`useScroll` expects a single ref argument.');
    }
  }

  const [state, setState] = useRafState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handler = () => {
      if (ref.current) {
        setState({
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop,
        });
      }
    };

    if (ref.current) {
      on(ref.current, 'scroll', handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      if (ref.current) {
        off(ref.current, 'scroll', handler);
      }
    };
  }, [ref]);

  return state;
};

export default useScroll2;