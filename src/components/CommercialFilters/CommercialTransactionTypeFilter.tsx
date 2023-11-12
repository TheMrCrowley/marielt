import React, { useMemo } from 'react';

import Select from '@/src/components/common/Select';
import { useCommercialFilters } from '@/src/store/commercialFilters';

const CommercialTransactionTypeFilter = () => {
  const {
    data: { transactions: transactionOptions, categories: categoriesData },
    filters: { transactionType: selectedTransaction, rootCategoryType: selectedRootCategory },
    updateFilters,
  } = useCommercialFilters();

  const dataToRender = useMemo(() => {
    const filtered = transactionOptions?.filter((transactionOption) => {
      const belongTo = new Set(
        categoriesData
          .filter((initialCategory) => selectedRootCategory === initialCategory.categoryName)
          .map((item) => item.commercialTransactions)
          .flat()
          .map((item) => item.transactionId),
      );

      return belongTo.has(transactionOption.transactionId);
    });

    return filtered?.length ? filtered : transactionOptions;
  }, [selectedRootCategory, transactionOptions]);

  if (!dataToRender.length) {
    return null;
  }

  return (
    <Select
      isMulti={false}
      values={selectedTransaction}
      label="Тип сделки"
      onChange={(type) => {
        updateFilters({ transactionType: type });
      }}
      items={dataToRender.map((transaction) => ({
        label: transaction.transactionName,
        value: transaction.transactionName,
      }))}
      wrapperClassName="flex-auto"
    />
  );
};

export default CommercialTransactionTypeFilter;
