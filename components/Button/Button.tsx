'use client';

import clsx from 'clsx';
import React from 'react';

type ButtonProps = {
  fontSize?: 20 | 16;
  fontWeight?: 'normal' | 'medium';
  buttonType?: 'primary' | 'secondary';
  children?: React.ReactNode | React.ReactElement;
};

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
      <button className={clsx(commonStyles, 'text-black')} color="secondary" {...props}>
        {children}
      </button>
    );
  }

  return (
    <button className={clsx(commonStyles, 'text-secondary')} color="secondary" {...props}>
      {children}
    </button>
  );
};

export default Button;
