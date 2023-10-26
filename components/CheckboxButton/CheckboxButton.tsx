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
        'py-3',
        'px-5',

        'hover:cursor-pointer',
        isChecked ? 'text-white' : 'text-[#A3A3A3]',
        isChecked ? 'bg-[#E3C49680]' : 'bg-[#4C4C4C]',
      )}
    >
      <input
        checked={isChecked}
        type="checkbox"
        role="button"
        className={clsx('hidden')}
        onChange={(e) => onChange(e.target.checked)}
      />
      {children}
    </label>
  );
};

export default CheckboxButton;
