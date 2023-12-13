import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

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
  applyFilters: (searchFilters?: Partial<FlatsFiltersType['filters']>) => string;
}

const DefaultFilters = ({ openModal, applyFilters }: DefaultFilterProps) => {
  const router = useRouter();

  const { filters, updateFilters, deleteTag, tags, reset } = useFlatsFilter();

  const getApplyUrl = useCallback(
    (searchFilters?: Partial<FlatsFiltersType['filters']>) => {
      const updatedUrl = applyFilters(searchFilters);
      router.prefetch(updatedUrl);
      return updatedUrl;
    },
    [filters],
  );

  const searchApply = (searchFilters?: Partial<FlatsFiltersType['filters']>) => {
    router.push(getApplyUrl(searchFilters));
  };

  return (
    <FiltersWrapper
      openModal={openModal}
      filtersList={
        <FiltersTagsList
          deleteTag={(key, value) => {
            deleteTag(key as keyof FlatsFiltersType['filters'], value, searchApply);
          }}
          tags={tags}
          reset={() => {
            reset(searchApply);
          }}
        />
      }
    >
      <div
        className={clsx(
          'flex',
          'gap-8',
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
          'gap-8',
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
            // updateFilters({ ...data });
            // applyFilters({ ...data });
            searchApply(data);
          }}
          search={getFlatsSearchResults}
          values={{
            district_rb: filters.district_rb,
            locality: filters.locality,
            region: filters.region,
            street: filters.street,
          }}
        />
        <Link href={getApplyUrl()} prefetch>
          <Button className={clsx('md:self-end', 'flex-1', 'w-full')}>Применить</Button>
        </Link>
      </div>
    </FiltersWrapper>
  );
};

export default DefaultFilters;
