import clsx from 'clsx';
import React from 'react';

import DistrictFilter from '@/src/components/FlatsFilters/DistrictFilter';
import MetroFilter from '@/src/components/FlatsFilters/MetroFilter';
import MicroDistrictFilter from '@/src/components/FlatsFilters/MicroDistrictFilter';
import RoominessFilter from '@/src/components/FlatsFilters/RoominessFilter';
import Button from '@/src/components/common/Button';
import Chip from '@/src/components/common/Chip';
import AreaFilter from '@/src/components/filters/AreaFilter';
import FiltersWrapper from '@/src/components/filters/DefaultFiltersWrapper';
import PriceFilter from '@/src/components/filters/PriceFilter';
import { useFlatsFilter } from '@/src/store/flatsFilters';

interface DefaultFilterProps {
  openModal: () => void;
  applyFilters: () => void;
}

const DefaultFilters = ({ openModal, applyFilters }: DefaultFilterProps) => {
  const { filters, updateFilters } = useFlatsFilter();

  return (
    <FiltersWrapper
      openModal={openModal}
      filtersList={
        /* TODO move this somewhere */

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
      }
    >
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
        <PriceFilter
          onChange={updateFilters}
          priceFrom={filters.priceFrom}
          priceTo={filters.priceTo}
        />
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
        <AreaFilter areaFrom={filters.areaFrom} areaTo={filters.areaTo} onChange={updateFilters} />
        <Button className={clsx('md:self-end', 'flex-1', 'w-full')} onClick={applyFilters}>
          Применить
        </Button>
      </div>
    </FiltersWrapper>
  );
};

export default DefaultFilters;
