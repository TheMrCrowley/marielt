import { useEffect } from 'react';

import { BREAK_POINT_CAPTURED_EVENT_NAME } from '@/enums/Width';

export const useWindowResizeEventDispatcher = () => {
  useEffect(() => {
    const dispatch = () => {
      window.dispatchEvent(new Event(BREAK_POINT_CAPTURED_EVENT_NAME));
    };
    window.addEventListener('resize', dispatch);

    return () => window.removeEventListener('resize', dispatch);
  }, []);
};
