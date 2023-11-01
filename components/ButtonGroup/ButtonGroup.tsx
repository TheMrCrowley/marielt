'use client';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import InputWrapper from '@/components/InputWrapper';

interface ButtonGroupItemProps {
  label: string;
  handleClick: (value: string) => void;
  isActive: boolean;
  value: string;
}

const ButtonGroupItem = ({ handleClick, value, label, isActive }: ButtonGroupItemProps) => (
  <button
    className={clsx(
      'md:text-xl',
      'text-base',
      'border-b',
      'border-solid',
      'py-3',
      'px-4',
      'border-[#B1B1B1]',
      !isActive && 'text-[#B1B1B1]',
      isActive && 'border-secondary',
      isActive && 'bg-secondary',
      isActive && 'text-[#262626]',
    )}
    onClick={() => handleClick(value)}
  >
    {label}
  </button>
);

interface ButtonGroupProps {
  label: string;
  items: Array<{
    label: string;
    value: string;
  }>;
  onChange: (selected: string[]) => void;
  values: string[];
}

const ButtonGroup = ({ items, label, onChange, values }: ButtonGroupProps) => {
  const [selected, setSelected] = useState<string[]>(values);

  const handleClick = (value: string) => {
    const isSelected = selected.find((item) => item === value);

    if (isSelected) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected((prev) => [...prev, value]);
    }
  };

  // TODO fix this
  useEffect(() => {
    setSelected(values);
  }, [values]);

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <InputWrapper label={label}>
      <div className={clsx('flex', 'gap-1', 'flex-wrap')}>
        {items.map(({ label: buttonLabel, value }) => (
          <ButtonGroupItem
            key={`button-group-button-item-${label}-${buttonLabel}-${value}`}
            handleClick={handleClick}
            isActive={!!selected.find((item) => item === value)}
            label={buttonLabel}
            value={value}
          />
        ))}
      </div>
    </InputWrapper>
  );
};

export default React.memo(ButtonGroup);