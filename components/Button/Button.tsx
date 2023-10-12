import { Button as NextUiButton, ButtonProps as NextUiButtonProps } from '@nextui-org/react';
import React from 'react';

type ButtonProps = {
  type?: 'primary' | 'secondary';
  children: React.ReactNode | React.ReactElement;
} & NextUiButtonProps;

const Button = ({ children }: ButtonProps) => {
  return (
    <NextUiButton variant="bordered" color="secondary" radius="none">
      {children}
    </NextUiButton>
  );
};

export default Button;
