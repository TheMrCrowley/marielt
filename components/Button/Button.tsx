'use client';

import clsx from 'clsx';
import React from 'react';

import { getFontSizeClassName, getFontWeightClassName } from '@/helpers/classNameHelpers';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  fontSize?: 20 | 16;
  fontWeight?: 'normal' | 'medium';
  buttonType?: 'filled' | 'bordered';
  children?: React.ReactNode | React.ReactElement;
  endIcon?: React.ReactNode | React.ReactElement;
}

const Button = ({
  children,
  buttonType = 'filled',
  fontSize = 16,
  fontWeight = 'normal',
  endIcon,
  className,
  ...props
}: ButtonProps) => {
  const commonStyles = clsx(
    'flex',
    'justify-center',
    'items-center',
    getFontSizeClassName(fontSize),
    getFontWeightClassName(fontWeight),
    'py-2',
    'px-16',
    'gap-x-2.5',
    'transition',
    'hover:bg-[#ffffff50]',
    'max-h-14',
    className,
  );

  if (buttonType === 'filled') {
    return (
      <button className={clsx(commonStyles, 'text-black', 'bg-secondary')} {...props}>
        {children} {endIcon}
      </button>
    );
  }

  return (
    <button
      className={clsx(commonStyles, 'text-secondary', 'border', 'border-solid', 'border-secondary')}
      {...props}
    >
      {children} {endIcon}
    </button>
  );
};

export default Button;
