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
  placeholderPrefix?: string;
  values?: string[];
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
}: SelectProps) => {
  const { formattedOptions, isOpen, selected, toggleSelect, wrapperRef } = useSelect({
    onChange,
    options,
    isMulti,
    values,
  });

  const renderOptions = () =>
    formattedOptions.map((formattedOption) => (
      <Option key={`${formattedOption.label}-${formattedOption.value}`} {...formattedOption} />
    ));

  const renderPlaceholder = () => {
    if (placeholder) {
      return selected[0] ? `${placeholderPrefix || ''} ${selected[0]}` : placeholder;
    }
    return selected.length ? `Выбрано: ${selected.length}` : 'Выбрать';
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
        selected.length ? 'border-secondary' : 'border-[#d9d9d9]',
      )}
      onClick={toggleSelect}
    >
      <div className={clsx('flex', 'justify-between', 'items-center')}>
        <p className={clsx('text-[20px]', selected.length ? 'text-white' : 'text-[#d9d9d9]')}>
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
            optionWidth === 'full' ? 'w-full' : 'w-max',
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
