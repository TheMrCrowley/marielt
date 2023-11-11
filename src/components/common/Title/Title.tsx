import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import {
  FontSizeType,
  FontWeightType,
  getFontSizeClassName,
  getFontWeightClassName,
} from '@/src/helpers/classNameHelpers';

interface TitleProps extends PropsWithChildren {
  variant?: 'h1' | 'h2';
  className?: string;
  fontSize?: FontSizeType;
  fontWeight?: FontWeightType;
}

const Title = ({
  variant = 'h1',
  children,
  className,
  fontSize = 36,
  fontWeight = 'normal',
}: TitleProps) => {
  const commonClassName = clsx(
    getFontSizeClassName(fontSize),
    getFontWeightClassName(fontWeight),
    'text-white',
  );

  const renderTitle = () => {
    switch (variant) {
      case 'h1':
        return <h1 className={clsx(commonClassName, className, 'leading-snug')}>{children}</h1>;
      case 'h2':
        return <h2 className={clsx(commonClassName, className, 'leading-snug')}>{children}</h2>;
    }
  };

  return renderTitle();
};

export default Title;
