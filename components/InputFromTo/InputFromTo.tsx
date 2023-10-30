import clsx from 'clsx';
import React from 'react';

import InputWrapper from '@/components/InputWrapper';

interface InputFromToProps {
  label: string;
  values: {
    from: string;
    to: string;
  };
  onChange: (values: { from: string; to: string }) => void;
  subLabel?: string | React.ReactNode | React.ReactElement;
  minMax?: {
    min: number;
    max: number;
  };
  wrapperClassName?: string;
  maxLength?: number;
}

const formatToNumber = (value: string, maxLength?: number) =>
  maxLength ? value.substring(0, maxLength).replace(/[\D\s]/gim, '') : value.replace(/\D/gim, '');

const InputFromTo = ({
  label,
  onChange,
  values,
  subLabel,
  minMax,
  wrapperClassName,
  maxLength,
}: InputFromToProps) => {
  const { from, to } = values;

  const handleChange = (value: string) =>
    minMax
      ? value &&
        Math.max(Number(minMax?.min), Math.min(Number(minMax?.max), Number(value))).toString()
      : value;

  return (
    <InputWrapper wrapperClassName={wrapperClassName} label={label} subLabel={subLabel}>
      <div className={clsx('flex', 'gap-x-1')}>
        <input
          type="text"
          value={from}
          onChange={(e) =>
            onChange({
              from: handleChange(formatToNumber(e.target.value, maxLength)),
              to,
            })
          }
          className={clsx(
            'px-4',
            'py-2',
            'max-w-[140px]',
            'text-[20px]',
            'text-white',
            'border-b',
            'border-[#D9D9D9]',
          )}
          placeholder="От"
          min={minMax?.min}
          max={minMax?.max}
        />

        <input
          type="text"
          value={to}
          onChange={(e) => {
            onChange({
              from,
              to: handleChange(formatToNumber(e.target.value, maxLength)),
            });
          }}
          placeholder="До"
          className={clsx(
            'px-4',
            'py-2',
            'max-w-[140px]',
            'text-[20px]',
            'text-white',
            'border-b',
            'border-[#D9D9D9]',
          )}
          min={minMax?.min}
          max={minMax?.max}
        />
      </div>
    </InputWrapper>
  );
};

export default InputFromTo;
