import { create } from 'zustand';

import {
  CommercialRootCategoryTypeValues,
  TransactionTypeValues,
} from '@/src/enums/CommercialFilters';
import { CommercialCategory, CommercialTransaction } from '@/src/types/Commercial';
import { BaseFilters } from '@/src/types/Filters';

export type CommercialFiltersType = BaseFilters<
  {
    // Default
    transactionType: string;
    rootCategoryType: string;
    propertyType: string[];
    priceFrom: string;
    priceTo: string;
    areaFrom: string;
    areaTo: string;
    floorFrom: string;
    floorTo: string;
    constructionYearFrom: string;
    constructionYearTo: string;
    profitabilityFrom: string;
    profitabilityTo: string;
    paybackFrom: string;
    paybackTo: string;
    isFirstFloor: boolean;
    isLastFloor: boolean;
    isGroundFloor: boolean;
    vat: boolean;
    separateEntrance: boolean;
    commercialLocation: string[];
    separateRoomsFrom: string;
    separateRoomsTo: string;
    ceilingHeightFrom: string;
    ceilingHeightTo: string;
    finishing: string[];
    bathroom: boolean;
    furniture: boolean;
    ramp: boolean;
    plotAreaFrom: string;
    plotAreaTo: string;
    wallMaterial: string[];
    directions: string[];
    distance: string;
    heating: boolean;
    water: boolean;
    sewerage: boolean;
    electricity: boolean;
    gas: boolean;
    priceForMeterFrom: string;
    priceForMeterTo: string;
    //
    district_rb: string[];
    locality: string[];
    region: string[];
    street: string[];
  },
  {
    transactions: CommercialTransaction[];
    categories: CommercialCategory[];
    directions: string[];
  }
>;

const initialCommercialFilters: CommercialFiltersType['filters'] = {
  transactionType: '',
  rootCategoryType: '',
  propertyType: [],
  priceFrom: '',
  priceTo: '',
  areaFrom: '',
  areaTo: '',
  floorFrom: '',
  floorTo: '',
  isFirstFloor: false,
  isLastFloor: false,
  isGroundFloor: false,
  constructionYearFrom: '',
  constructionYearTo: '',
  profitabilityFrom: '',
  profitabilityTo: '',
  paybackFrom: '',
  paybackTo: '',
  vat: false,
  separateEntrance: false,
  commercialLocation: [],
  separateRoomsFrom: '',
  separateRoomsTo: '',
  ceilingHeightFrom: '',
  ceilingHeightTo: '',
  finishing: [],
  bathroom: false,
  furniture: false,
  ramp: false,
  plotAreaFrom: '',
  plotAreaTo: '',
  wallMaterial: [],
  directions: [],
  distance: '',
  heating: false,
  water: false,
  sewerage: false,
  electricity: false,
  gas: false,
  priceForMeterFrom: '',
  priceForMeterTo: '',
  district_rb: [],
  locality: [],
  region: [],
  street: [],
};

export const useCommercialFilters = create<CommercialFiltersType>((set) => ({
  filters: initialCommercialFilters,
  data: {
    transactions: [],
    categories: [],
    directions: [],
  },
  updateFilters: (update) => {
    set((prev) => ({
      filters: {
        ...prev.filters,
        ...update,
      },
    }));
  },
  setData: (data) => {
    set({ data });
  },
  isExpandedOpen: false,
  setIsExpandedOpen: (isExpandedOpen) => set({ isExpandedOpen }),
}));

export const getTransactionTypeUid = (
  data: CommercialTransaction[],
  selectedTransaction: string,
): TransactionTypeValues | null => {
  const transactionUid = data.find(
    (transaction) => transaction.transactionName === selectedTransaction,
  )?.transactionUid;

  return transactionUid || null;
};

export const getCommercialRootCategoryUid = (
  data: CommercialCategory[],
  selectedRootCategory: string,
): CommercialRootCategoryTypeValues | null => {
  const categoryUid = data.find(
    (category) => category.categoryName === selectedRootCategory,
  )?.categoryUid;

  return categoryUid || null;
};

export const getCommercialFiltersToApply = (
  selectedTransaction: TransactionTypeValues | null,
  selectedRootCategory: CommercialRootCategoryTypeValues | null,
  filters: CommercialFiltersType['filters'],
): Partial<CommercialFiltersType['filters']> => {
  const {
    transactionType,
    rootCategoryType,
    priceFrom,
    priceTo,
    priceForMeterFrom,
    priceForMeterTo,
    district_rb,
    region,
    street,
    locality,
    areaFrom,
    areaTo,
    floorFrom,
    floorTo,
    isFirstFloor,
    isGroundFloor,
    constructionYearFrom,
    constructionYearTo,
    profitabilityFrom,
    profitabilityTo,
    paybackFrom,
    paybackTo,
    vat,
    separateEntrance,
    isLastFloor,
    commercialLocation,
    separateRoomsFrom,
    separateRoomsTo,
    ceilingHeightFrom,
    ceilingHeightTo,
    finishing,
    bathroom,
    furniture,
    ramp,
    propertyType,
    plotAreaFrom,
    plotAreaTo,
    wallMaterial,
    directions,
    distance,
    heating,
    water,
    sewerage,
    gas,
    electricity,
  } = filters;

  const defaultFilters = {
    transactionType,
    rootCategoryType,
    priceFrom,
    priceTo,
    priceForMeterFrom,
    priceForMeterTo,
    district_rb,
    region,
    street,
    locality,
    areaFrom: selectedRootCategory === CommercialRootCategoryTypeValues.Uchastki ? '' : areaFrom,
    areaTo: selectedRootCategory === CommercialRootCategoryTypeValues.Uchastki ? '' : areaTo,
    plotAreaFrom:
      selectedRootCategory !== CommercialRootCategoryTypeValues.Uchastki ? '' : plotAreaFrom,
    plotAreaTo:
      selectedRootCategory !== CommercialRootCategoryTypeValues.Uchastki ? '' : plotAreaTo,
  };

  const businessFilters = {
    areaFrom,
    areaTo,
    floorFrom,
    floorTo,
    isFirstFloor,
    isGroundFloor,
    constructionYearFrom,
    constructionYearTo,
    profitabilityFrom,
    profitabilityTo,
    paybackFrom,
    paybackTo,
    vat,
    separateEntrance,
  };

  const officeFilters = {
    areaFrom,
    areaTo,
    floorFrom,
    floorTo,
    isFirstFloor,
    constructionYearFrom,
    constructionYearTo,
    isLastFloor,
    commercialLocation,
    separateRoomsFrom,
    separateRoomsTo,
    ceilingHeightFrom,
    ceilingHeightTo,
    finishing,
    bathroom,
    separateEntrance,
    furniture,
  };

  const shopFilters = {
    commercialLocation,
    areaFrom,
    areaTo,
    floorFrom,
    floorTo,
    isFirstFloor,
    isGroundFloor,
    separateRoomsFrom,
    separateRoomsTo,
    ceilingHeightFrom,
    ceilingHeightTo,
    constructionYearFrom,
    constructionYearTo,
    finishing,
    bathroom,
    separateEntrance,
    ramp,
  };

  const cafeFilters = {
    commercialLocation,
    areaFrom,
    areaTo,
    floorFrom,
    floorTo,
    isFirstFloor,
    isLastFloor,
    ceilingHeightFrom,
    ceilingHeightTo,
    constructionYearFrom,
    constructionYearTo,
    finishing,
    bathroom,
    separateEntrance,
    ramp,
  };

  const warehouseFilters = {
    areaFrom,
    areaTo,
    ceilingHeightFrom,
    ceilingHeightTo,
    constructionYearFrom,
    constructionYearTo,
    propertyType,
    plotAreaFrom,
    plotAreaTo,
    wallMaterial,
    directions,
    distance,
    heating,
    water,
    sewerage,
    electricity,
    ramp,
  };

  const productionFilters = {
    propertyType,
    areaFrom,
    areaTo,
    plotAreaFrom,
    plotAreaTo,
    directions,
    ceilingHeightFrom,
    ceilingHeightTo,
    constructionYearFrom,
    distance,
    heating,
    water,
    sewerage,
    electricity,
    gas,
  };

  const plotFilters = { propertyType, plotAreaFrom, plotAreaTo, directions, distance };

  const rentBusiness = {
    propertyType,
    areaFrom,
    areaTo,
    floorFrom,
    floorTo,
    isFirstFloor,
    isGroundFloor,
    constructionYearFrom,
    constructionYearTo,
    profitabilityFrom,
    profitabilityTo,
    paybackFrom,
    paybackTo,
    vat,
    separateEntrance,
  };

  const garageFilters = {
    propertyType,
    areaFrom,
    areaTo,
    constructionYearFrom,
    constructionYearTo,
  };

  console.log(selectedRootCategory !== CommercialRootCategoryTypeValues.Uchastki);

  switch (selectedTransaction) {
    case TransactionTypeValues.Business:
      return {
        ...defaultFilters,
        ...businessFilters,
      };
    default:
      return (() => {
        switch (selectedRootCategory) {
          case CommercialRootCategoryTypeValues.Offices:
            return {
              ...defaultFilters,
              ...officeFilters,
            };
          case CommercialRootCategoryTypeValues.Shops:
            return {
              ...defaultFilters,
              ...shopFilters,
            };
          case CommercialRootCategoryTypeValues.RestorantCafe:
            return {
              ...defaultFilters,
              ...cafeFilters,
            };
          case CommercialRootCategoryTypeValues.Warehouses: {
            return {
              ...defaultFilters,
              ...warehouseFilters,
            };
          }
          case CommercialRootCategoryTypeValues.Production:
            return {
              ...defaultFilters,
              ...productionFilters,
            };
          case CommercialRootCategoryTypeValues.Uchastki:
            return {
              ...defaultFilters,
              ...plotFilters,
            };
          case CommercialRootCategoryTypeValues.RentBusiness:
            return {
              ...defaultFilters,
              ...rentBusiness,
            };
          case CommercialRootCategoryTypeValues.Garage:
            return {
              ...defaultFilters,
              ...garageFilters,
            };
          default:
            return {
              ...defaultFilters,
            };
        }
      })();
  }
};
