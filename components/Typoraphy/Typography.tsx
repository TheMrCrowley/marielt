import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import styles from './Typography.module.css';

interface TypographyProps extends PropsWithChildren {
  className?: string;
  fontSize?: 20 | 16;
  fontWeight?: 'bold' | 'regular';
}

// TODO DRY
const getFontWeightClassName = (fontWeight: TypographyProps['fontWeight']): string => {
  switch (fontWeight) {
    case 'bold':
      return styles.boldFontWeight;
    case 'regular':
      return styles.regularFontWeight;
    default:
      return styles.regularFontWeight;
  }
};

const getFontSizeClassName = (fontSize: TypographyProps['fontSize']): string => {
  switch (fontSize) {
    case 20:
      return styles.mediumFontSize;
    case 16:
      return styles.smallFontSize;
    default:
      return styles.mediumFontSize;
  }
};

const Typography = ({
  children,
  className,
  fontSize = 20,
  fontWeight = 'regular',
}: TypographyProps) => {
  const commonClassName = clsx(
    styles.typography,
    getFontSizeClassName(fontSize),
    getFontWeightClassName(fontWeight),
  );

  return <p className={clsx(commonClassName, className)}>{children}</p>;
};

export default Typography;
