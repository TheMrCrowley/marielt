import clsx from 'clsx';
import React from 'react';

import CheckboxButton from '@/components/CheckboxButton';
import ExpandedFiltersWrapper from '@/components/Filters/ExpandedFiltersWrapper';
import {
  HousesAndLotsType,
  getRouteByHouseType,
  housesAndLotsTypeMap,
} from '@/enums/HousesAndLotsFilters';
import { useHousesAndLotsFilters } from '@/store/housesAndLotsFilters';

import CottagesFilters from './CottagesFilters';
import DachiFilters from './DachiFilters';
import PlotsFilters from './PlotsFilters';

interface ExpandedFiltersProps {
  isModalOpen: boolean;
  closeModal: () => void;
  applyFilters: () => void;
}

const TypeChanger = () => {
  const {
    filters: { housesAndLotsType },
    updateFilters,
  } = useHousesAndLotsFilters();

  // TODO think to not rerender page while modal is open, but after apply
  return (
    <div className={clsx('flex', 'justify-between', 'items-center', 'gap-5', 'w-max')}>
      {Object.entries(housesAndLotsTypeMap).map(([key, value]) => (
        <CheckboxButton
          key={`houses-and-lots-type-changer-item-${key}-${value}`}
          isChecked={housesAndLotsType === value}
          onChange={(checked) => {
            updateFilters({ housesAndLotsType: value });
          }}
        >
          {value}
        </CheckboxButton>
      ))}
    </div>
  );
};

const ExpandedFilters = ({ applyFilters, closeModal, isModalOpen }: ExpandedFiltersProps) => {
  const {
    filters: { housesAndLotsType },
  } = useHousesAndLotsFilters();

  const getFiltersByType = (type: string) => {
    switch (getRouteByHouseType(type)) {
      case HousesAndLotsType.Plots:
        return <PlotsFilters applyFilters={applyFilters} />;
      case HousesAndLotsType.Dachi:
        return <DachiFilters applyFilters={applyFilters} />;
      case HousesAndLotsType.Cottages:
        return <CottagesFilters applyFilters={applyFilters} />;
      default:
        return 'Выбери тип';
    }
  };

  return (
    <ExpandedFiltersWrapper closeModal={closeModal} isModalOpen={isModalOpen}>
      <TypeChanger />
      {getFiltersByType(housesAndLotsType)}
    </ExpandedFiltersWrapper>
  );
};

export default ExpandedFilters;
