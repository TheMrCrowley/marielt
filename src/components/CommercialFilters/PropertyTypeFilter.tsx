import React, { useMemo } from 'react';

import Select from '@/src/components/common/Select';
import { useCommercialFilters } from '@/src/store/commercialFilters';

const PropertyTypeFilter = () => {
  const {
    data: { categories },
    filters: {
      transactionType: selectedTransaction,
      rootCategoryType: selectedRootCategory,
      propertyType: selectedPropertyType,
    },
    updateFilters,
  } = useCommercialFilters();

  const dataToRender = useMemo(() => {
    const filtered = categories
      .filter((category) =>
        category.commercialTransactions.some(
          (transaction) => transaction.transactionName === selectedTransaction,
        ),
      )
      .filter((category) =>
        selectedRootCategory ? category.belongTo === selectedRootCategory : category.belongTo,
      );

    return filtered;
  }, [selectedRootCategory, categories, selectedTransaction]);

  if (!dataToRender.length) {
    return null;
  }

  return (
    <Select
      isMulti
      label="Вид Объекта"
      items={dataToRender.map((item) => ({
        label: item.categoryName,
        value: item.categoryName,
      }))}
      onChange={(selected) => updateFilters({ propertyType: selected })}
      values={selectedPropertyType}
      wrapperClassName="md:basis-1/3 basis-full"
    />
  );
};

export default PropertyTypeFilter;
