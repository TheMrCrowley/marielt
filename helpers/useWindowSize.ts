import { useState, useEffect } from 'react';

import { WindowWidth } from '@/enums/Width';

import { BREAK_POINT_CAPTURED_EVENT_NAME } from './../enums/Width';
import { getBreakPointByWindowWidth } from './getBreakPointByWindowWidth';

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
