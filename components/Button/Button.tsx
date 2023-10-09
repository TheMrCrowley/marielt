import React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'primary' | 'secondary' | 'link';
  icon?: React.ReactNode | React.ReactElement;
  children?: React.ReactNode | React.ReactElement;
}

const Button = ({ variant = 'primary', icon, children }: ButtonProps) => {
  return <button>{children}</button>;
};

export default Button;
