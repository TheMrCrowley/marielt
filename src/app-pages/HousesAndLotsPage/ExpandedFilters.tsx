import clsx from 'clsx';
import React, { useMemo } from 'react';

import CheckboxButton from '@/src/components/common/CheckboxButton';
import ExpandedFiltersWrapper from '@/src/components/filters/ExpandedFiltersWrapper';
import { HousesAndLotsRootCategory } from '@/src/enums/HousesAndLotsFilters';
import { getHousesAndLotsRoute } from '@/src/helpers/getHousesAndLotsRoute';
import {
  HousesAndLotsFiltersType,
  useHousesAndLotsFilters,
} from '@/src/store/housesAndLotsFilters';

import CottagesFilters from './CottagesFilters';
import DachiFilters from './DachiFilters';
import PlotsFilters from './PlotsFilters';

interface ExpandedFiltersProps {
  isModalOpen: boolean;
  closeModal: () => void;
  applyFilters: (selectedFilters: Partial<HousesAndLotsFiltersType['filters']>) => void;
}

const TypeChanger = () => {
  const {
    filters: { housesAndLotsRootCategory },
    data: { housesAndLotasCategories },
    updateFilters,
  } = useHousesAndLotsFilters();

  const dataToRender = useMemo(
    () => housesAndLotasCategories.filter((category) => category.isRoot),
    [housesAndLotasCategories],
  );

  // TODO think to not rerender page while modal is open, but after apply
  return (
    <div
      className={clsx('flex', 'justify-between', 'items-center', 'gap-5', 'max-w-max', 'flex-wrap')}
    >
      {dataToRender.map(({ uid, categoryName }) => (
        <CheckboxButton
          key={`houses-and-lots-type-changer-item-${categoryName}-${uid}`}
          isChecked={housesAndLotsRootCategory === categoryName}
          onChange={() => {
            updateFilters({ housesAndLotsRootCategory: categoryName });
          }}
        >
          {categoryName}
        </CheckboxButton>
      ))}
    </div>
  );
};

const ExpandedFilters = ({ applyFilters, closeModal, isModalOpen }: ExpandedFiltersProps) => {
  const {
    filters: { housesAndLotsRootCategory },
    data: { housesAndLotasCategories },
  } = useHousesAndLotsFilters();

  const getFiltersByType = () => {
    switch (getHousesAndLotsRoute(housesAndLotsRootCategory, housesAndLotasCategories)) {
      case HousesAndLotsRootCategory.Plots:
        return <PlotsFilters applyFilters={applyFilters} />;
      case HousesAndLotsRootCategory.Dachi:
        return <DachiFilters applyFilters={applyFilters} />;
      case HousesAndLotsRootCategory.Cottages:
        return <CottagesFilters applyFilters={applyFilters} />;
      default:
        return null;
    }
  };

  return (
    <ExpandedFiltersWrapper closeModal={closeModal} isModalOpen={isModalOpen}>
      <TypeChanger />
      {getFiltersByType()}
    </ExpandedFiltersWrapper>
  );
};

export default ExpandedFilters;
