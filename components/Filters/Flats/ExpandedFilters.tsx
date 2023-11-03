'use client';

import clsx from 'clsx';
import React from 'react';

import Button from '@/components/Button';
import ExpandedFiltersWrapper from '@/components/Filters/ExpandedFiltersWrapper';
import SaleTermFilter from '@/components/Filters/components/SaleTermFilter';
import Switch from '@/components/Switch';
import { useFlatsFilter } from '@/store/flatsFilters';

import ExpandedAreaFilter from './components/ExpandedAreaFilter';
import FloorFilter from './components/FloorFilter';
import HouseTypeFilter from './components/HouseTypeFilter';
import LayoutFilter from './components/LayoutFilter';
import YearsFilter from './components/YearsFilter';

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
