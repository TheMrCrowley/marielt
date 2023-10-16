import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Typography from '@/components/Typography';
import { getIsItemSelected } from '@/helpers/getIsItemSelected';
import { useClickOutside } from '@/helpers/useClickOutside';
import ChevronIcon from '@/public/chevron-down.svg';
import { OptionType } from '@/types/Option';

import Option from './Option';

interface SelectProps {
  options: OptionType[];
  onChange: (selected: OptionType['value'][]) => void;
}

const Select = ({ onChange, options }: SelectProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const wrapperRef = useClickOutside(() => {
    setIsOpen(false);
  });

  const handleClickOption = (value: string) => {
    const isSelected = !!selected.find((option) => option === value);
    if (isSelected) {
      setSelected(selected.filter((option) => option !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const renderOptions = () => {
    return options.map(({ label, value }) => {
      const isSelected = getIsItemSelected(selected, value);

      return (
        <Option
          key={`${label}-${value}`}
          label={label}
          value={value}
          onClick={handleClickOption}
          isSelected={isSelected}
        />
      );
    });
  };

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <div className={clsx('flex', 'flex-col', 'gap-y-2')}>
      <Typography>Label</Typography>
      <div
        ref={wrapperRef}
        className={clsx(
          'relative',
          'flex',
          'flex-col',
          'min-w-[180px]',
          'min-h-[48px]',
          'bg-transparent',
          'px-4',
          'py-2',
          'border-solid',
          'border-b',
          'hover:cursor-pointer',
          selected.length ? 'border-secondary' : 'border-[#d9d9d9]',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={clsx('flex', 'justify-between', 'items-center')}>
          <p
            className={clsx(
              'text-[20px]',
              selected.length ? 'text-white' : 'text-[#d9d9d9]',
              'select-none',
            )}
          >
            {selected.length ? `Выбрано: ${selected.length}` : 'Выбрать'}
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
              'w-full',
              'left-0',
              'bg-primary',
              'max-h-60',
              'overflow-y-auto',
            )}
          >
            {renderOptions()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
