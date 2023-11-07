import qs from 'qs';

import { CommercialRootCategoryTypeValues, TransactionTypeValues } from '@/enums/CommercialFilters';
import { StrapiFindResponse } from '@/types/StrapiFindResponse';

import { getDirections } from './housesAndLotsFilters';

interface CommercialTransactionResponse {
  name: string;
  uid: TransactionTypeValues;
  commercial_categories: {
    data: Array<{
      id: string;
      attributes: {
        name: string;
      };
    }>;
  };
}

interface CommercialCategoryResponse {
  name: string;
  uid: CommercialRootCategoryTypeValues;
  category: string | null;
  comm_trans: {
    data: Array<{
      id: string;
      attributes: {
        name: string;
      };
    }>;
  };
}

export interface CommercialTransaction {
  transactionName: string;
  transactionId: string;
  transactionUid: TransactionTypeValues;
  commercialCategories: Array<{ categoryId: string; categoryName: string }>;
}

export interface CommercialCategory {
  categoryName: string;
  belongTo: string | null;
  categoryUid: CommercialRootCategoryTypeValues;
  isRoot: boolean;
  categoryId: string;
  commercialTransactions: Array<{
    transactionName: string;
    transactionId: string;
  }>;
}

const getCommercialTransactions = async (): Promise<Array<CommercialTransaction>> => {
  const query = qs.stringify(
    {
      populate: 'commercial_categories',
      pagination: {
        limit: -1,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const response = await fetch(`${process.env.API_BASE_URL}/comm-trans?${query}`);

  const { data } = (await response.json()) as StrapiFindResponse<CommercialTransactionResponse>;

  return formatCommercialTransaction(data);
};

const getCommercialCategories = async (): Promise<Array<CommercialCategory>> => {
  const query = qs.stringify(
    {
      populate: 'comm_trans',
      pagination: {
        limit: -1,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const response = await fetch(
    `${process.env.API_BASE_URL}/commercial-property-categories?${query}`,
  );

  const { data, meta } = (await response.json()) as StrapiFindResponse<CommercialCategoryResponse>;

  return formatCommercialCategory(data);
};

export const getCommercialFiltersData = async () => {
  const [transactions, categories, directions] = await Promise.all([
    getCommercialTransactions(),
    getCommercialCategories(),
    getDirections(),
  ]);

  return {
    transactions,
    categories,
    directions,
  };
};

const formatCommercialTransaction = (
  data: StrapiFindResponse<CommercialTransactionResponse>['data'],
): Array<CommercialTransaction> =>
  data.map((transaction) => ({
    transactionId: transaction.id,
    transactionName: transaction.attributes.name,
    transactionUid: transaction.attributes.uid,
    commercialCategories: transaction.attributes.commercial_categories.data.map((category) => ({
      categoryId: category.id,
      categoryName: category.attributes.name,
    })),
  }));

const formatCommercialCategory = (
  data: StrapiFindResponse<CommercialCategoryResponse>['data'],
): Array<CommercialCategory> =>
  data.map((category) => ({
    categoryId: category.id,
    categoryName: category.attributes.name,
    categoryUid: category.attributes.uid,
    isRoot: !category.attributes.category,
    belongTo: category.attributes.category,
    commercialTransactions: category.attributes.comm_trans.data.map((transaction) => ({
      transactionId: transaction.id,
      transactionName: transaction.attributes.name,
    })),
  }));
