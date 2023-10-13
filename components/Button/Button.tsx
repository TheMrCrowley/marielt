'use client';

import { Button as NextUiButton, ButtonProps as NextUiButtonProps } from '@nextui-org/react';
import clsx from 'clsx';
import React from 'react';

type ButtonProps = {
  fontSize?: 20 | 16;
  fontWeight?: 'normal' | 'medium';
  buttonType?: 'primary' | 'secondary';
  children?: React.ReactNode | React.ReactElement;
} & NextUiButtonProps;

const Button = ({
  children,
  buttonType = 'primary',
  fontSize = 16,
  fontWeight = 'normal',
  ...props
}: ButtonProps) => {
  const commonStyles = clsx(`text-[${fontSize}px]`, `font-${fontWeight}`, 'px-16', 'gap-x-2.5');
  if (buttonType === 'secondary') {
    return (
      <NextUiButton
        className={clsx(commonStyles, 'text-black')}
        variant="solid"
        color="secondary"
        radius="none"
        {...props}
      >
        {children}
      </NextUiButton>
    );
  }

  return (
    <NextUiButton
      className={clsx(commonStyles, 'text-secondary')}
      variant="bordered"
      color="secondary"
      radius="none"
      {...props}
    >
      {children}
    </NextUiButton>
  );
};

export default Button;
