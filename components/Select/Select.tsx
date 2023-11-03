'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import InputWrapper, { InputWrapperProps } from '@/components/InputWrapper';
import ChevronIcon from '@/public/chevron-down.svg';
import { OptionType } from '@/types/Option';

import Option from './Option';
import { useSelect } from './useSelect';

interface SelectProps extends InputWrapperProps {
  options: OptionType[];
  onChange: (selected: OptionType['value'][]) => void;
  placeholder?: string;
  values?: string[];
  placeholderPrefix?: string;
  placeholderPostfix?: string;

  isMulti?: boolean;
  //TODO think how to improve this
  optionWidth?: 'full' | 'maxContent';
}

const Select = ({
  onChange,
  options,
  placeholder,
  isMulti = false,
  values = [],
  label,
  wrapperClassName,
  subLabel,
  optionWidth = 'maxContent',
  placeholderPrefix,
  placeholderPostfix,
}: SelectProps) => {
  const { formattedOptions, isOpen, toggleSelect, wrapperRef } = useSelect({
    onChange,
    options,
    isMulti,
    values,
  });

  const renderOptions = () =>
    formattedOptions.map((formattedOption) => (
      <Option
        key={`select-option-item-${formattedOption.label}-${formattedOption.value}`}
        {...formattedOption}
      />
    ));

  const renderPlaceholder = () => {
    if (placeholder) {
      return values[0]
        ? `${placeholderPrefix || ''} ${values[0]} ${placeholderPostfix || ''}`
        : placeholder;
    }
    return values.length ? `Выбрано: ${values.length}` : 'Выбрать';
  };

  const renderSelect = () => (
    <div
      ref={wrapperRef}
      className={clsx(
        'relative',
        'flex',
        'flex-col',
        'min-h-[48px]',
        'bg-transparent',
        'px-4',
        'py-2',
        'border-solid',
        'border-b',
        'hover:cursor-pointer',
        'select-none',
        'w-full',
        placeholder ? 'min-w-[140px]' : 'min-w-[180px]',
        values.length && values.some(Boolean) ? 'border-secondary' : 'border-[#d9d9d9]',
      )}
      onClick={toggleSelect}
    >
      <div className={clsx('flex', 'justify-between', 'items-center', 'gap-x-2')}>
        <p
          className={clsx(
            'lg:text-xl',
            'text-base',
            values.length ? 'text-white' : 'text-[#d9d9d9]',
          )}
        >
          {renderPlaceholder()}
        </p>
        <Image src={ChevronIcon} alt="chevron" className={clsx(isOpen && 'rotate-180')} />
      </div>
      {isOpen && (
        <div
          className={clsx(
            'flex',
            'flex-col',
            'absolute',
            'top-full',
            'z-10',
            'left-0',
            'bg-[#4C4C4C]',
            'max-h-60',
            'overflow-y-auto',
            'scrollbar-thin',
            'scrollbar-thumb-primary',
            'scrollbar-track-secondary',
            // optionWidth === 'full' ? 'md:w-full' : 'md:w-max',
            'w-full',
          )}
        >
          {renderOptions()}
        </div>
      )}
    </div>
  );

  if (label) {
    return (
      <InputWrapper label={label} wrapperClassName={wrapperClassName} subLabel={subLabel}>
        {renderSelect()}
      </InputWrapper>
    );
  }

  return renderSelect();
};

export default React.memo(Select);
