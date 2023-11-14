import clsx from 'clsx';
import React from 'react';

import DistrictFilter from '@/src/components/FlatsFilters/DistrictFilter';
import MetroFilter from '@/src/components/FlatsFilters/MetroFilter';
import MicroDistrictFilter from '@/src/components/FlatsFilters/MicroDistrictFilter';
import RoominessFilter from '@/src/components/FlatsFilters/RoominessFilter';
import Button from '@/src/components/common/Button';
import AreaFilter from '@/src/components/filters/AreaFilter';
import FiltersWrapper from '@/src/components/filters/DefaultFiltersWrapper';
import FiltersTagsList from '@/src/components/filters/FiltersTagsList';
import PriceFilter from '@/src/components/filters/PriceFilter';
import SearchField from '@/src/components/filters/SearchField';
import { getFlatsSearchResults } from '@/src/services/flatsServices';
import { FlatsFiltersType, useFlatsFilter } from '@/src/store/flatsFilters';

interface DefaultFilterProps {
  openModal: () => void;
  applyFilters: (searchFilters?: Partial<FlatsFiltersType['filters']>) => void;
}

const DefaultFilters = ({ openModal, applyFilters }: DefaultFilterProps) => {
  const { filters, updateFilters, deleteTag, tags, reset } = useFlatsFilter();

  return (
    <FiltersWrapper
      openModal={openModal}
      filtersList={
        <FiltersTagsList
          deleteTag={(key, value) => {
            deleteTag(key as keyof FlatsFiltersType['filters'], value, applyFilters);
          }}
          tags={tags}
          reset={() => {
            reset(applyFilters);
          }}
        />
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
          'md:items-end',
          'flex-col',
          'items-start',
        )}
      >
        <AreaFilter areaFrom={filters.areaFrom} areaTo={filters.areaTo} onChange={updateFilters} />
        <SearchField
          onClick={(data) => {
            // TODO think how to make this better

            updateFilters({ ...data });
            applyFilters({ ...data });
          }}
          search={getFlatsSearchResults}
          values={{
            district_rb: filters.district_rb,
            locality: filters.locality,
            region: filters.region,
            street: filters.street,
          }}
        />
        <Button className={clsx('md:self-end', 'flex-1', 'w-full')} onClick={() => applyFilters()}>
          Применить
        </Button>
      </div>
    </FiltersWrapper>
  );
};

export default DefaultFilters;
