import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';

import CheckboxGroup from '@/src/components/common/CheckboxGroup';
import Typography from '@/src/components/common/Typography';
import ExpandedFiltersWrapper from '@/src/components/filters/ExpandedFiltersWrapper';
import {
  CommercialRootCategoryTypeValues,
  TransactionTypeValues,
} from '@/src/enums/CommercialFilters';
import {
  CommercialFiltersType,
  getCommercialRootCategoryUid,
  getTransactionTypeUid,
  useCommercialFilters,
} from '@/src/store/commercialFilters';
import { useCurrency } from '@/src/store/currency';
import { CommercialCategory, CommercialTransaction } from '@/src/types/Commercial';

import BusinessFilter from './BusinessFilter';
import GarageFilter from './GarageFilter';
import OfficeFilter from './OfficeFilter';
import PlotsFilters from './PlotsFilters';
import ProductionFilter from './ProductionFilter';
import RentBusinessFilter from './RentBusinessFilter';
import RestorantCafeFilter from './RestorantCafeFilter';
import ShopsFilter from './ShopsFilter';
import WarehousesFilter from './WarehousesFilter';

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

  const { changeCurrency } = useCurrency();

  useEffect(() => {
    const transactionUid = getTransactionTypeUid(transactions, transactionType);
    changeCurrency(transactionUid === TransactionTypeValues.Rent ? 'EUR' : 'USD');
  }, [transactionType]);

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
              rootCategoryType: '',
              propertyType: [],
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
      onChange={(category) => updateFilters({ rootCategoryType: category, propertyType: [] })}
      values={selectedRootCategory}
    />
  );
};

const getFilterByTransactionAndRootCategory = ({
  categoriesData,
  selectedRootCategory,
  selectedTransaction,
  transactionData,
  applyFilters,
}: {
  transactionData: CommercialTransaction[];
  selectedTransaction: string;
  categoriesData: CommercialCategory[];
  selectedRootCategory: string;
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}) => {
  const transactionUid = getTransactionTypeUid(transactionData, selectedTransaction);

  switch (transactionUid) {
    case TransactionTypeValues.Business:
      return <BusinessFilter applyFilters={applyFilters} />;
    default:
      return getFilterByRootCategory({ categoriesData, selectedRootCategory, applyFilters });
  }
};

const getFilterByRootCategory = ({
  categoriesData,
  selectedRootCategory,
  applyFilters,
}: {
  categoriesData: CommercialCategory[];
  selectedRootCategory: string;
  applyFilters: (selectedFilters: Partial<CommercialFiltersType['filters']>) => void;
}) => {
  const categoryUid = getCommercialRootCategoryUid(categoriesData, selectedRootCategory);

  switch (categoryUid) {
    case CommercialRootCategoryTypeValues.Offices:
      return <OfficeFilter applyFilters={applyFilters} />;
    case CommercialRootCategoryTypeValues.Shops:
      return <ShopsFilter applyFilters={applyFilters} />;
    case CommercialRootCategoryTypeValues.RestorantCafe:
      return <RestorantCafeFilter applyFilters={applyFilters} />;
    case CommercialRootCategoryTypeValues.Warehouses:
      return <WarehousesFilter applyFilters={applyFilters} />;
    case CommercialRootCategoryTypeValues.Production:
      return <ProductionFilter applyFilters={applyFilters} />;
    case CommercialRootCategoryTypeValues.Uchastki:
      return <PlotsFilters applyFilters={applyFilters} />;
    case CommercialRootCategoryTypeValues.RentBusiness:
      return <RentBusinessFilter applyFilters={applyFilters} />;
    case CommercialRootCategoryTypeValues.Garage:
      return <GarageFilter applyFilters={applyFilters} />;
    default:
      return null;
  }
};

const ExpandedFilters = ({ applyFilters, closeModal, isModalOpen }: ExpandedFiltersProps) => {
  const {
    filters: { transactionType: selectedTransaction, rootCategoryType: selectedRootCategory },
    data: { transactions: transactionData, categories: categoriesData },
  } = useCommercialFilters();

  const onApply = (params: Partial<CommercialFiltersType['filters']>) => {
    applyFilters(params);
    closeModal();
  };

  const component = useMemo(() => {
    return getFilterByTransactionAndRootCategory({
      categoriesData,
      selectedRootCategory,
      selectedTransaction,
      transactionData,
      applyFilters: onApply,
    });
  }, [selectedTransaction, selectedRootCategory]);

  return (
    <ExpandedFiltersWrapper closeModal={closeModal} isModalOpen={isModalOpen}>
      <TransactionChanger />
      <RootCategoryChanger />
      {component}
    </ExpandedFiltersWrapper>
  );
};

export default ExpandedFilters;
