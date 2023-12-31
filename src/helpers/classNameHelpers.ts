export type FontSizeType = 128 | 48 | 40 | 36 | 32 | 24 | 20 | 16 | 14 | 12;
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
    case 128:
      return 'md:text-9xl text-5xl';
    case 48:
      return 'xl:text-5xl lg:text-[40px] md:text-4xl sm:text-[32px] text-2xl';
    case 40:
      return 'xl:text-[40px] lg:text-4xl md:text-[32px] text-2xl';
    case 36:
      return 'lg:text-4xl md:text-[32px] text-2xl';
    case 32:
      return 'lg:text-[32px] md:text-2xl text-xl';
    case 24:
      return 'lg:text-2xl sm:text-xl text-base';
    case 20:
      return 'lg:text-xl md:text-base text-sm';
    case 16:
      return 'md:text-base text-sm';
    case 14:
      return 'text-sm';
    case 12:
      return 'text-xs';
    default:
      return 'text-[32px]';
  }
};
