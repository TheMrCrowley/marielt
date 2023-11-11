import React, { useMemo } from 'react';

import Select from '@/src/components/common/Select';
import { useHousesAndLotsFilters } from '@/src/store/housesAndLotsFilters';

const HousesAndLotsRootCategoryFilter = () => {
  const {
    filters: { housesAndLotsRootCategory },
    data: { housesAndLotasCategories },
    updateFilters,
  } = useHousesAndLotsFilters();

  const dataToRender = useMemo(
    () =>
      housesAndLotasCategories
        .filter((category) => category.isRoot)
        .map((category) => ({
          label: category.categoryName,
          value: category.categoryName,
        })),
    [housesAndLotasCategories],
  );

  return (
    <Select
      isMulti={false}
      label="Тип недвижимости"
      items={dataToRender}
      onChange={(selected) => {
        updateFilters({ housesAndLotsRootCategory: selected });
      }}
      values={housesAndLotsRootCategory}
      wrapperClassName="flex-1"
    />
  );
};

export default HousesAndLotsRootCategoryFilter;
