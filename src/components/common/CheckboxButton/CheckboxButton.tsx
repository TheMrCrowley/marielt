import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

interface CheckboxButtonProps extends PropsWithChildren {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxButton = ({ isChecked, onChange, children }: CheckboxButtonProps) => {
  return (
    <label
      className={clsx(
        'flex',
        'justify-center',
        'items-center',
        'md:py-2',
        'py-1',
        'md:text-xl',
        'text-base',
        'md:px-5',
        'px-3',
        'w-max',
        'hover:cursor-pointer',
        isChecked ? 'text-white' : 'text-[#A3A3A3]',
        isChecked ? 'bg-[#E3C49680]' : 'bg-[#4C4C4C]',
        'first-letter:uppercase',
      )}
    >
      {children}
      <input
        checked={isChecked}
        type="checkbox"
        role="button"
        className={clsx('hidden')}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
};

export default CheckboxButton;
