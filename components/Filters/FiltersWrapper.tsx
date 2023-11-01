'use client';

import clsx from 'clsx';
import React, { PropsWithChildren, ReactNode } from 'react';

import CurrencySwitch from '@/components/CurrencySwitch';
import { useCurrency } from '@/store/currency';

interface FiltersWrapperProps extends PropsWithChildren {
  openModal: () => void;
  filtersList?: ReactNode;
}

const FiltersWrapper = ({ children, openModal, filtersList }: FiltersWrapperProps) => {
  const { changeCurrency, selectedCurrency } = useCurrency();

  return (
    <div
      className={clsx(
        'w-full',
        'bg-[#262626]',
        'md:pt-14',
        'md:pb-9',
        'py-4',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'gap-y-10',
      )}
    >
      <section
        className={clsx(
          'flex',
          'flex-col',
          'flex-auto',
          'w-full',
          'md:gap-y-10',
          'gap-y-5',
          'md:px-8',
          'px-4',
          'md:max-w-[1400px]',
          'max-w-full',
        )}
      >
        <div
          className={clsx(
            'flex',
            'justify-between',
            'w-full',
            'md:flex-row',
            'flex-col',
            'items-start',
            'gap-y-5',
          )}
        >
          <CurrencySwitch
            onChange={(cur) => changeCurrency(cur)}
            selectedCurrency={selectedCurrency}
          />
          <button
            onClick={openModal}
            className={clsx('text-[#B1B1B1]', 'underline', 'md:text-xl', 'text-base')}
          >
            Расширенный фильтр
          </button>
        </div>
        {children}
      </section>
      {filtersList}
    </div>
  );
};

export default FiltersWrapper;
