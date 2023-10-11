import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import styles from './Title.module.css';

interface TitleProps extends PropsWithChildren {
  variant?: 'h1' | 'h2';
  className?: string;
  fontSize?: 48 | 40 | 36 | 32 | 24 | 20;
  fontWeight?: 'bold' | 'regular' | 'thin';
}

const getFontWeightClassName = (fontWeight: TitleProps['fontWeight']): string => {
  switch (fontWeight) {
    case 'bold':
      return styles.boldFontWeight;
    case 'regular':
      return styles.regularFontWeight;
    case 'thin':
      return styles.thinFontWeight;
    default:
      return styles.regularFontWeight;
  }
};

const getFontSizeClassName = (fontSize: TitleProps['fontSize']): string => {
  switch (fontSize) {
    case 48:
      return styles.extraLargeFontSize;
    case 40:
      return styles.largeFontSize;
    case 36:
      return styles.extraMediumFontSize;
    case 32:
      return styles.mediumFontSize;
    case 24:
      return styles.smallFontSize;
    case 20:
      return styles.extraSmallFontSize;
    default:
      return styles.mediumFontSize;
  }
};

const Title = ({
  variant = 'h1',
  children,
  className,
  fontSize = 36,
  fontWeight = 'regular',
}: TitleProps) => {
  const commonClassName = clsx(
    styles.title,
    getFontSizeClassName(fontSize),
    getFontWeightClassName(fontWeight),
  );

  const renderTitle = () => {
    switch (variant) {
      case 'h1':
        return <h1 className={clsx(commonClassName, styles.h1, className)}>{children}</h1>;
      case 'h2':
        return <h2 className={clsx(commonClassName, className)}>{children}</h2>;
    }
  };

  return renderTitle();
};

export default Title;
