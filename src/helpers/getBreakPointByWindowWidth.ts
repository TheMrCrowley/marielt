import { WindowWidth } from '@/src/enums/Width';

export const getBreakPointByWindowWidth = (): WindowWidth => {
  const width = window.innerWidth;

  if ((width >= WindowWidth.XS && width < WindowWidth.SM) || width <= 320) {
    return WindowWidth.XS;
  }

  if (width >= WindowWidth.SM && width < WindowWidth.MD) {
    return WindowWidth.SM;
  }

  if (width >= WindowWidth.MD && width < WindowWidth.LG) {
    return WindowWidth.MD;
  }

  if (width >= WindowWidth.LG && width < WindowWidth.XL) {
    return WindowWidth.LG;
  }

  if (width >= WindowWidth.XL && width < WindowWidth.ExtraXL) {
    return WindowWidth.XL;
  }

  return WindowWidth.ExtraXL;
};
