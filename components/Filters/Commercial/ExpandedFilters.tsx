import clsx from 'clsx';
import React, { useMemo } from 'react';

import CheckboxGroup from '@/components/CheckboxGroup';
import ExpandedFiltersWrapper from '@/components/Filters/ExpandedFiltersWrapper';
import Typography from '@/components/Typography';
import { TransactionTypeValues } from '@/enums/CommercialFilters';
import { CommercialCategory, CommercialTransaction } from '@/services/commercialFilters';
import { CommercialFiltersType, useCommercialFilters } from '@/store/commercialFilters';

import BusinessFilter from './BusinessFilter';

interface ExpandedFiltersProps {
  isModalOpen: boolean;
  closeModal: () => void;
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}

const TransactionChanger = () => {
  const {
    data: { transactions },
    filters: { transactionType },
    updateFilters,
  } = useCommercialFilters();

  return (
    <div className={clsx('flex', 'border-y', 'border-[#B1B1B1]', 'max-w-max')}>
      {transactions.map(({ transactionName, transactionUid }) => (
        <div
          className={clsx(
            'flex',
            'justify-center',
            'items-center',
            'py-2',
            'px-8',
            transactionName === transactionType ? 'bg-secondary' : 'bg-transparent',
            'hover:cursor-pointer',
          )}
          onClick={() =>
            updateFilters({
              transactionType: transactionName,
            })
          }
          key={`transaction-changer-transaction-changer-item-${transactionUid}-${transactionName}`}
        >
          <Typography
            fontSize={20}
            color={transactionName === transactionType ? 'text-black' : 'text-[#B1B1B1]'}
          >
            {transactionName}
          </Typography>
        </div>
      ))}
    </div>
  );
};

const RootCategoryChanger = () => {
  const {
    data: { transactions: transactionsData, categories: categoriesOptions },
    filters: { transactionType: selectedTransaction, rootCategoryType: selectedRootCategory },
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

  if (!selectedTransaction || dataToRender.length <= 1) {
    return null;
  }

  return (
    <CheckboxGroup
      isMulti={false}
      items={dataToRender.map((item) => ({
        label: item.categoryName,
        value: item.categoryName,
      }))}
      onChange={(category) => updateFilters({ rootCategoryType: category })}
      values={selectedRootCategory}
    />
  );
};

const getFilterByTransactionAndRootCategory = ({
  categoriesData,
  selectedRootCategory,
  selectedTransaction,
  transactionData,
}: {
  transactionData: CommercialTransaction[];
  selectedTransaction: string;
  categoriesData: CommercialCategory[];
  selectedRootCategory: string;
}) => {
  const transactionUid = transactionData.find(
    (transaction) => transaction.transactionName === selectedTransaction,
  )?.transactionUid;

  switch (transactionUid) {
    case TransactionTypeValues.Business:
      return <BusinessFilter />;
    default:
      return getFilterByRootCategory({ categoriesData, selectedRootCategory });
  }
};

const getFilterByRootCategory = ({
  categoriesData,
  selectedRootCategory,
}: {
  categoriesData: CommercialCategory[];
  selectedRootCategory: string;
}) => {
  const categoryUid = categoriesData.find(
    (category) => category.categoryName === selectedRootCategory,
  )?.categoryUid;

  switch (categoryUid) {
    default:
      return null;
  }
};

const ExpandedFilters = ({ applyFilters, closeModal, isModalOpen }: ExpandedFiltersProps) => {
  const {
    filters: { transactionType: selectedTransaction, rootCategoryType: selectedRootCategory },
    data: { transactions: transactionData, categories: categoriesData },
  } = useCommercialFilters();
  return (
    <ExpandedFiltersWrapper closeModal={closeModal} isModalOpen={isModalOpen}>
      <TransactionChanger />
      <RootCategoryChanger />
      {getFilterByTransactionAndRootCategory({
        categoriesData,
        selectedRootCategory,
        selectedTransaction,
        transactionData,
      })}
    </ExpandedFiltersWrapper>
  );
};

export default ExpandedFilters;
