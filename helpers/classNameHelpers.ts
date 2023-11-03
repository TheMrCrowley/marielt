export type FontSizeType = 48 | 40 | 36 | 32 | 24 | 20 | 16 | 14;
export type FontWeightType = 'medium' | 'normal' | 'light';

export const getFontWeightClassName = (fontWeight: FontWeightType): string => {
  switch (fontWeight) {
    case 'medium':
      return 'font-medium';
    case 'normal':
      return 'font-normal';
    case 'light':
      return 'font-light';
    default:
      return 'font-normal';
  }
};

export const getFontSizeClassName = (fontSize: FontSizeType): string => {
  switch (fontSize) {
    case 48:
      return 'text-5xl';
    case 40:
      return 'md:text-[40px] text-2xl';
    case 36:
      return 'text-4xl';
    case 32:
      return 'text-[32px]';
    case 24:
      return 'text-2xl';
    case 20:
      return 'md:text-xl text-base';
    case 16:
      return 'text-base';
    case 14:
      return 'text-sm';
    default:
      return 'text-[32px]';
  }
};
