'use client';

import clsx from 'clsx';
import React from 'react';

import ExpandedAreaFilter from '@/src/components/FlatsFilters/ExpandedAreaFilter';
import FloorFilter from '@/src/components/FlatsFilters/FloorFilter';
import HouseTypeFilter from '@/src/components/FlatsFilters/HouseTypeFilter';
import LayoutFilter from '@/src/components/FlatsFilters/LayoutFilter';
import YearsFilter from '@/src/components/FlatsFilters/YearsFilter';
import Button from '@/src/components/common/Button';
import Switch from '@/src/components/common/Switch';
import ExpandedFiltersWrapper from '@/src/components/filters/ExpandedFiltersWrapper';
import SaleTermFilter from '@/src/components/filters/SaleTermFilter';
import { useFlatsFilter } from '@/src/store/flatsFilters';

interface ExpandedFiltersProps {
  isModalOpen: boolean;
  closeModal: () => void;
  applyFilters: () => void;
}

const ExpandedFilters = ({ closeModal, isModalOpen, applyFilters }: ExpandedFiltersProps) => {
  const {
    filters: { furniture, parking, saleTerm },
    updateFilters,
  } = useFlatsFilter();

  return (
    <ExpandedFiltersWrapper closeModal={closeModal} isModalOpen={isModalOpen}>
      <div className={clsx('flex', 'w-full', 'justify-between', 'gap-8', 'flex-wrap')}>
        <FloorFilter />
        <HouseTypeFilter />
      </div>
      <ExpandedAreaFilter />
      <LayoutFilter />
      <div className={clsx('flex', 'w-full', 'justify-start', 'gap-8', 'items-end', 'flex-wrap')}>
        <YearsFilter />
        <SaleTermFilter onChange={updateFilters} saleTerm={saleTerm} />
      </div>
      <div className={clsx('flex', 'items-end', 'gap-8', 'flex-wrap')}>
        <Switch
          label="Мебель"
          onChange={(checked) => updateFilters({ furniture: checked })}
          isChecked={furniture}
        />
        <Switch
          label="Парковка"
          onChange={(checked) => updateFilters({ parking: checked })}
          isChecked={parking}
        />
      </div>
      <Button className={clsx('mt-auto', 'self-center')} onClick={applyFilters}>
        Применить
      </Button>
    </ExpandedFiltersWrapper>
  );
};

export default ExpandedFilters;
