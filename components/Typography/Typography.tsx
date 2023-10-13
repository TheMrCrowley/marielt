import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import {
  FontSizeType,
  FontWeightType,
  getFontSizeClassName,
  getFontWeightClassName,
} from '@/helpers/classNameHelpers';

interface TypographyProps extends PropsWithChildren {
  className?: string;
  fontSize?: FontSizeType;
  fontWeight?: FontWeightType;
}

const Typography = ({
  children,
  className,
  fontSize = 20,
  fontWeight = 'normal',
}: TypographyProps) => {
  const commonClassName = clsx(
    getFontSizeClassName(fontSize),
    getFontWeightClassName(fontWeight),
    'text-white',
  );

  return <p className={clsx(commonClassName, className)}>{children}</p>;
};

export default Typography;
