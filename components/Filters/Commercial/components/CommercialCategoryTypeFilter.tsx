import React, { useMemo } from 'react';

import Select from '@/components/Select';
import { useCommercialFilters } from '@/store/commercialFilters';

const CommercialCategoryTypeFilter = () => {
  const {
    data: { transactions: transactionsData, categories: categoriesOptions },
    filters: { transactionType: selectedTransaction, categoryType: selectedCategory },
    updateFilters,
  } = useCommercialFilters();

  const dataToRender = useMemo(() => {
    const rootCategories = categoriesOptions.filter((category) => category.isRoot);
    const filtered = rootCategories
      .filter((categoryOption) => !categoryOption.belongTo)
      .filter((categoryOption) => {
        const belongTo = new Set(
          transactionsData
            .filter(
              (initialTransaction) => selectedTransaction === initialTransaction.transactionName,
            )
            .map((transaction) => transaction.commercialCategories)
            .flat()
            .map((category) => category.categoryId),
        );

        return belongTo.has(categoryOption.categoryId);
      });

    return filtered.length ? filtered : rootCategories;
  }, [selectedTransaction, categoriesOptions]);

  if (!dataToRender.length) {
    return null;
  }

  return (
    <Select
      label="Тип недвижимости"
      placeholder="Выбрать"
      values={[selectedCategory]}
      onChange={([selected]) => {
        updateFilters({ categoryType: selected });
      }}
      options={dataToRender.map((category) => ({
        label: category.categoryName,
        value: category.categoryName,
      }))}
      wrapperClassName="basis-1/5"
    />
  );
};

export default CommercialCategoryTypeFilter;
