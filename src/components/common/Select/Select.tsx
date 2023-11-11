'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

import ChevronIcon from '@/public/chevron-down.svg';
import InputWrapper, { InputWrapperProps } from '@/src/components/common/InputWrapper';
import { getIsItemSelected } from '@/src/helpers/getIsItemSelected';
import { useClickOutside } from '@/src/hooks/useClickOutside';

import Option, { OptionItemProps } from './Option';

interface NewProps<T extends boolean> extends InputWrapperProps {
  isMulti: T;
  onChange: (selected: T extends true ? string[] : string) => void;
  items: Array<{
    value: string;
    label: string;
  }>;
  values: T extends true ? string[] : string;
  placeholder?: string;
  placeholderPrefix?: string;
  placeholderPostfix?: string;
}

function Select<T extends boolean>({
  isMulti,
  items,
  onChange,
  values,
  label,
  subLabel,
  wrapperClassName,
  placeholder = 'Выбрать',
  placeholderPostfix,
  placeholderPrefix,
}: NewProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const wrapperRef = useClickOutside(() => {
    setIsOpen(false);
  });

  const handleClickOption = (value: string) => {
    if (isMulti) {
      const isSelected = (values as string[]).find((item) => item === value);
      if (isSelected) {
        (onChange as (selected: string[]) => void)(
          (values as string[]).filter((item) => item !== value),
        );
      } else {
        (onChange as (selected: string[]) => void)([...(values as string[]), value]);
      }
    } else {
      const isSelected = (values as string) === value;
      if (isSelected) {
        (onChange as (selected: string) => void)('');
      } else {
        (onChange as (selected: string) => void)(value);
        setIsOpen(false);
      }
    }
  };

  const formattedOptions = useMemo<OptionItemProps[]>(() => {
    return items.map((option) => {
      if (isMulti) {
        const isSelected = getIsItemSelected(values as string[], option.value);

        return {
          ...option,

          isSelected,
          onClick: handleClickOption,
        };
      }
      return {
        ...option,
        isSelected: (values as string) === option.value,
        onClick: handleClickOption,
      };
    });
  }, [values, items]);

  const renderOptions = () =>
    formattedOptions.map((formattedOption) => (
      <Option
        key={`select-option-item-${formattedOption.label}-${formattedOption.value}`}
        {...formattedOption}
      />
    ));

  const renderPlaceholder = () => {
    if (isMulti) {
      return values.length ? `Выбрано: ${values.length}` : 'Выбрать';
    }
    return values
      ? `${placeholderPrefix || ''} ${values} ${placeholderPostfix || ''}`
      : placeholder;
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
        !!values.length ? 'border-secondary' : 'border-[#d9d9d9]',
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={clsx('flex', 'justify-between', 'items-center', 'gap-x-2')}>
        <p
          className={clsx(
            'lg:text-xl',
            'text-base',
            !!values.length ? 'text-white' : 'text-[#d9d9d9]',
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
}

export default Select;
