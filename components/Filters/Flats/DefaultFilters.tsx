import clsx from 'clsx';
import React from 'react';

import Button from '@/components/Button';
import Chip from '@/components/Chip';
import CurrencySwitch from '@/components/CurrencySwitch';
import { useCurrency } from '@/store/currency';
import { useFlatsFilter } from '@/store/flatsFilters';

import AreaFilter from './components/AreaFilter';
import DistrictFilter from './components/DistrictFilter';
import MetroFilter from './components/MetroFilter';
import MicroDistrictFilter from './components/MicroDistrictFilter';
import PriceFilter from './components/PriceFilter';
import RoominessFilter from './components/RoominessFilter';

interface DefaultFilterProps {
  openModal: () => void;
  applyFilters: () => void;
}

const DefaultFilters = ({ openModal, applyFilters }: DefaultFilterProps) => {
  const { changeCurrency, selectedCurrency } = useCurrency();
  const { filters, updateFilters } = useFlatsFilter();

  return (
    <>
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
            'md:max-w-max',
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
          <div
            className={clsx(
              'flex',
              'gap-9',
              'flex-wrap',
              'w-full',
              'md:items-center',
              'md:justify-between',
              'md:flex-row',
              'flex-col',
            )}
          >
            <RoominessFilter />
            <PriceFilter />
            <DistrictFilter />
            <MicroDistrictFilter />
            <MetroFilter />
          </div>

          <div
            className={clsx(
              'flex',
              'md:justify-between',
              'gap-5',
              'md:flex-row',
              'md:items-center',
              'flex-col',
              'items-start',
            )}
          >
            <AreaFilter />
            <Button className={clsx('md:self-end', 'flex-1', 'w-full')} onClick={applyFilters}>
              Применить
            </Button>
          </div>
        </section>
        {/* TODO move this somewhere */}
        <section className={clsx('flex', 'max-w-7xl', 'flex-auto', 'flex-wrap', 'gap-3', 'w-full')}>
          {Object.entries(filters)
            .filter(([, value]) => (Array.isArray(value) ? !!value.length : !!value))
            .map(([key, value]) => (
              <Chip
                onDelete={() => {
                  if (Array.isArray(value)) {
                    updateFilters({ [key]: [] });
                    return;
                  }
                  if (typeof value === 'string') {
                    updateFilters({ [key]: '' });
                    return;
                  }
                  if (typeof value === 'boolean') {
                    updateFilters({ [key]: false });
                    return;
                  }
                }}
                label={
                  Array.isArray(value) ? value.join(', ') : typeof value === 'string' ? value : key
                }
                key={`chip-item-for-${key}-${value}`}
              />
            ))}
        </section>
      </div>
    </>
  );
};

export default DefaultFilters;
