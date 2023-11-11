import { useState, useEffect } from 'react';

import { BREAK_POINT_CAPTURED_EVENT_NAME, WindowWidth } from '@/src/enums/Width';
import { getBreakPointByWindowWidth } from '@/src/helpers/getBreakPointByWindowWidth';

export const useWindowSize = () => {
  const [breakPoint, setBreakPoint] = useState<WindowWidth>(WindowWidth.ExtraXL);

  useEffect(() => {
    setBreakPoint(getBreakPointByWindowWidth());
    const callback = () => {
      const currentBreakPoint = getBreakPointByWindowWidth();

      setBreakPoint(currentBreakPoint);
    };

    window.addEventListener(BREAK_POINT_CAPTURED_EVENT_NAME, callback);

    return () => window.removeEventListener(BREAK_POINT_CAPTURED_EVENT_NAME, callback);
  }, []);

  return breakPoint;
};
