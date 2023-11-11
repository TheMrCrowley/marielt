import clsx from 'clsx';
import React from 'react';

import Typography from '@/src/components/common/Typography';

interface SwitchProps {
  isChecked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

const Switch = ({ label, onChange, isChecked }: SwitchProps) => {
  return (
    <label className={clsx('flex', 'hover:cursor-pointer', 'max-w-max', 'gap-x-3', 'items-center')}>
      <input className="hidden" type="checkbox" onChange={(e) => onChange(e.target.checked)} />
      <Typography>{label}</Typography>
      <div
        className={clsx(
          'flex',
          'w-12',
          'h-5',
          'items-center',
          isChecked ? 'bg-secondary' : 'bg-[#4C4C4C]',
          isChecked ? 'justify-end' : 'justify-start',
          'rounded-full',
          'px-[2px]',
          'transition-all',
        )}
      >
        <div className={clsx('bg-white', 'rounded-full', 'w-4', 'h-4')}></div>
      </div>
    </label>
  );
};

export default Switch;
