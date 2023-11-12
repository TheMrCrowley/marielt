import clsx from 'clsx';
import React from 'react';

type InputVariant = 'primary' | 'secondary' | 'black' | 'gray';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  variant?: InputVariant;
}

const Input = ({ variant = 'primary', onChange, value, placeholder }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={clsx(
        'px-4',
        'py-3',
        'border-b',
        'border-[#B1B1B1]',
        'w-full',
        'lg:text-xl',
        'text-base',
        'text-white',
      )}
    />
  );
};

export default Input;
