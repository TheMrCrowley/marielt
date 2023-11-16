import { create } from 'zustand';

import {
  CommercialFinishingValues,
  CommercialLocationValues,
  CommercialRootCategoryTypeValues,
  CommercialWallMaterialValues,
  TransactionTypeValues,
  commercialFinishingQueryMap,
  commercialLocationQueryMap,
  commercialWallMaterialQueryMap,
} from '@/src/enums/CommercialFilters';
import { parseFiltersStateToTags } from '@/src/helpers/parseFiltersStateToTags';
import { CommercialCategory, CommercialTransaction } from '@/src/types/Commercial';
import { AvailableCurrencies } from '@/src/types/Currency';
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

const tagsDefaultState: CommercialFiltersType['tags'] = {
  transactionType: '',
  rootCategoryType: '',
  priceFrom: '',
  priceTo: '',
  areaFrom: '',
  areaTo: '',
  floorFrom: '',
  floorTo: '',
  constructionYearFrom: '',
  constructionYearTo: '',
  profitabilityFrom: '',
  profitabilityTo: '',
  paybackFrom: '',
  paybackTo: '',
  separateRoomsFrom: '',
  separateRoomsTo: '',
  ceilingHeightFrom: '',
  ceilingHeightTo: '',
  plotAreaFrom: '',
  plotAreaTo: '',
  distance: '',
  priceForMeterFrom: '',
  priceForMeterTo: '',
  propertyType: [],
  commercialLocation: [],
  finishing: [],
  wallMaterial: [],
  directions: [],
  district_rb: [],
  locality: [],
  region: [],
  street: [],
  isFirstFloor: '',
  isLastFloor: '',
  isGroundFloor: '',
  vat: '',
  separateEntrance: '',
  bathroom: '',
  furniture: '',
  ramp: '',
  heating: '',
  water: '',
  sewerage: '',
  electricity: '',
  gas: '',
};

const filtersNameMap: Record<
  keyof typeof tagsDefaultState,
  (value: string | string[], currency?: AvailableCurrencies) => string
> = {
  areaFrom: (value) => `Площадь от: ${value} м²`,
  areaTo: (value) => `Площадь до: ${value} м²`,
  priceFrom: (value, currency) => `Цена от: ${value} ${currency}`,
  priceTo: (value, currency) => `Цена до: ${value} ${currency}`,
  floorFrom: (value) => `Этаж от: ${value}`,
  floorTo: (value) => `Этаж до: ${value}`,
  constructionYearFrom: (value) => `Год постройки от: ${value}`,
  constructionYearTo: (value) => `Год постройки до: ${value}`,
  isLastFloor: () => 'Последний этаж',
  furniture: () => 'Мебель',
  finishing: (value) =>
    `Ремонт: ${commercialFinishingQueryMap[value as CommercialFinishingValues]}`,
  bathroom: () => 'Санузел',
  street: (value) => value as string,
  locality: (value) => value as string,
  district_rb: (value) => value as string,
  region: (value) => value as string,
  distance: (value) => `Расстояние от МКАД до: ${value} км.`,
  plotAreaFrom: (value) => `Площадь участка от: ${value} сот.`,
  plotAreaTo: (value) => `Площадь участка до: ${value} сот.`,
  directions: (value) => `${value} направление`,
  electricity: () => 'Электроснабжение',
  water: () => 'Водоснабжение',
  sewerage: () => 'Канализация',
  wallMaterial: (value) =>
    `Материал стен: ${commercialWallMaterialQueryMap[value as CommercialWallMaterialValues]}`,
  heating: () => 'Отопление',
  ceilingHeightFrom: (value) => `Высота потолков от: ${value}`,
  ceilingHeightTo: (value) => `Высота потолков до: ${value}`,
  gas: () => 'Газ',
  vat: () => 'НДС',
  commercialLocation: (value) =>
    `Расположение: ${commercialLocationQueryMap[value as CommercialLocationValues]}`,
  isFirstFloor: () => 'Первый этаж',
  isGroundFloor: () => 'Цокольный этаж',
  paybackFrom: (value) => `Окупаемость от: ${value}`,
  paybackTo: (value) => `Окупаемость до: ${value}`,
  priceForMeterFrom: (value, currency) => `Цена за м²: ${value}${currency}`,
  priceForMeterTo: (value, currency) => `Цена за м²: ${value}${currency}`,
  profitabilityFrom: (value) => `Доходность от: ${value}%`,
  profitabilityTo: (value) => `Доходность до: ${value}%`,
  propertyType: (value) => `Вид объекта: ${value}`,
  ramp: () => 'Погрузка/разгрузка',
  rootCategoryType: (value) => `Тип недвижимости: ${value}`,
  separateEntrance: () => 'Отдельный вход',
  separateRoomsFrom: (value) => `Раздельных помещений от: ${value}`,
  separateRoomsTo: (value) => `Раздельных помещений до: ${value}`,
  transactionType: (value) => `Тип сделки: ${value}`,
};

export const useCommercialFilters = create<CommercialFiltersType>((set, get) => ({
  filters: initialCommercialFilters,
  data: {
    transactions: [],
    categories: [],
    directions: [],
  },
  reset: (cb) => {
    set({
      filters: initialCommercialFilters,
      tags: tagsDefaultState,
    });
    cb(get().filters);
  },
  deleteTag: (key, value, cb) => {
    if (typeof tagsDefaultState[key] === 'boolean') {
      set((prev) => ({
        filters: {
          ...prev.filters,
          [key]: false,
        },
      }));
      cb?.(get().filters);
      return;
    }
    if (typeof tagsDefaultState[key] === 'string') {
      set((prev) => ({
        tags: {
          ...prev.tags,
          [key]: tagsDefaultState[key],
        },
        filters: {
          ...prev.filters,
          [key]: '',
        },
      }));
      cb?.(get().filters);
      return;
    }
    if (Array.isArray(tagsDefaultState[key])) {
      set((prev) => ({
        tags: {
          ...prev.tags,
          [key]: (prev.tags[key] as Array<{ value: string; label: string }>)?.filter(
            (item) => item.value !== value,
          ),
        },
        filters: {
          ...prev.filters,
          [key]: (prev.filters[key] as string[]).filter((item) => item !== value),
        },
      }));
      cb?.(get().filters);
      return;
    }
  },
  tags: tagsDefaultState,
  updateTags: (update, currency) => {
    set({
      tags: {
        ...parseFiltersStateToTags(update, currency, tagsDefaultState, filtersNameMap),
      },
    });
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
  viewType: 'list',
  changeView: (type) => set({ viewType: type }),

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
    propertyType,
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
