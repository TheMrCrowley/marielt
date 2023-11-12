import clsx from 'clsx';
import React from 'react';

import InputWrapper, { InputWrapperProps } from '@/src/components/common/InputWrapper';

type InputVariant = 'primary' | 'black' | 'white';

interface InputProps extends InputWrapperProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  variant?: InputVariant;
  endItem?: React.ReactElement | React.ReactNode;
  endItemWrapperClassName?: string;
}

const Input = ({
  variant = 'primary',
  onChange,
  value,
  placeholder,
  label,
  subLabel,
  wrapperClassName,
  endItem,
  endItemWrapperClassName,
}: InputProps) => {
  const input = (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={clsx(
        'px-4',
        'py-3',
        !label && 'border-b',
        !label && variant === 'primary' && value.length ? 'border-secondary' : 'border-[#B1B1B1]',
        !label && variant === 'black' && 'border-black',
        !label && variant === 'white' && 'border-white',
        !label && 'transition-all',
        'w-full',
        'lg:text-xl',
        'text-base',
        'text-white',
      )}
    />
  );

  if (!!label) {
    return (
      <InputWrapper
        label={label}
        subLabel={subLabel}
        wrapperClassName={clsx(
          'border-b',
          variant === 'primary' && value.length ? 'border-secondary' : 'border-[#B1B1B1]',
          variant === 'black' && 'border-black',
          variant === 'white' && 'border-white',
          'transition-all',
          wrapperClassName,
        )}
      >
        {endItem ? (
          <div
            className={clsx(
              'flex',
              'w-full',
              'justify-between',
              'items-center',
              'gap-2',
              endItemWrapperClassName,
            )}
          >
            {input}
            {endItem}
          </div>
        ) : (
          input
        )}
      </InputWrapper>
    );
  }

  return <>{input}</>;
};

export default Input;
