import clsx from 'clsx';
import React from 'react';

import InputWrapper from '@/src/components/common/InputWrapper';

interface InputFromToProps {
  label: string | React.ReactNode | React.ReactElement;
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
  inputWrapperClassName?: string;
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
  inputWrapperClassName,
}: InputFromToProps) => {
  const { from, to } = values;

  const handleChange = (value: string) =>
    minMax
      ? value &&
        Math.max(Number(minMax?.min), Math.min(Number(minMax?.max), Number(value))).toString()
      : value;

  return (
    <InputWrapper wrapperClassName={wrapperClassName} label={label} subLabel={subLabel}>
      <div
        className={clsx(
          'flex',
          'gap-x-1',
          'gap-y-3',
          'md:max-w-[290px]',
          'w-full',
          inputWrapperClassName,
        )}
      >
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
            'lg:text-xl',
            'text-base',
            'text-white',
            'border-b',
            'border-[#D9D9D9]',
            'w-full',
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
            'lg:text-xl',
            'text-base',
            'text-white',
            'border-b',
            'border-[#D9D9D9]',
            'w-full',
          )}
          min={minMax?.min}
          max={minMax?.max}
        />
      </div>
    </InputWrapper>
  );
};

export default InputFromTo;
