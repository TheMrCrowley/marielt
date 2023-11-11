import {
  CommercialCategory,
  CommercialTransaction,
  DefaultCommercialItem,
} from '@/src/types/Commercial';
import { AvailableCurrencies } from '@/src/types/Currency';
import { DefaultFlatItem } from '@/src/types/Flats';
import { DefaultHousesAndLotsItem, HousesAndLotsCategory } from '@/src/types/HousesAndLots';
import { District, MicroDistrict } from '@/src/types/Location';
import {
  CommercialCategoryResponse,
  CommercialStrapiResponse,
  CommercialTransactionResponse,
  DistrictResponse,
  FlatStrapiResponse,
  HousesAndLotsCategoryResponse,
  HousesAndLotsStrapiResponse,
  MicroDistrictResponse,
  StrapiFindResponse,
} from '@/src/types/StrapiTypes';

import { getFullAddress } from './getFullAddress';

export const formatToDefaultFlat = (
  flats: StrapiFindResponse<FlatStrapiResponse>['data'],
): DefaultFlatItem[] =>
  flats.map(({ attributes, id }) => ({
    address: getFullAddress({
      locality: attributes.locality,
      houseNumber: attributes.house_number?.number,
      street: attributes.street,
    }),
    id,
    price: attributes.price,
    name: attributes.name,
    img: attributes.image?.url,
    initialCurrency: attributes.currency || 'USD',
    parameters: {
      floor: attributes.parameters.floor,
      livingArea: attributes.parameters.living_area,
      maxFloor: attributes.parameters.floors_number,
      totalArea: attributes.parameters.total_area,
    },
  }));

export const formatToDefaultCommercial = (
  commercial: StrapiFindResponse<CommercialStrapiResponse>['data'],
): DefaultCommercialItem[] =>
  commercial.map(({ attributes: { locality, house_number, street, currency, comm_tran }, id }) => ({
    address: getFullAddress({
      locality,
      houseNumber: house_number?.number,
      street,
    }),
    id,
    initialCurrency: currency || 'USD',
    transactionType: comm_tran?.data?.attributes?.uid,
  }));

export const formatToDefaultHouseAndLotsItem = (
  housesAndLots: StrapiFindResponse<HousesAndLotsStrapiResponse>['data'],
): DefaultHousesAndLotsItem[] =>
  housesAndLots.map(
    ({
      attributes: { name, price, locality, street, house_number, currency, parameters, image },
      id,
    }) => ({
      id,
      address: getFullAddress({
        locality,
        houseNumber: house_number?.number,
        street,
      }),
      initialCurrency: currency || 'USD',
      img: image?.url,
      name,
      price,
      parameters: {
        plotSize: parameters.plot_size || 'Нету площади',
      },
    }),
  );

export const convertToMonetary = (value: number, type: AvailableCurrencies) =>
  new Intl.NumberFormat('by-BY', {
    currency: type,
    style: 'currency',
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export const convertToSign = (value: number, type: AvailableCurrencies) =>
  new Intl.NumberFormat('by-BY', {
    currency: type,
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export const formatToDistrict = (data: StrapiFindResponse<DistrictResponse>['data']): District[] =>
  data.map((district) => ({
    districtId: district.id,
    districtName: district.attributes.name,
    microdistricts: district.attributes.microdistricts.data.map((microdistrict) => ({
      microdistrictId: microdistrict.id,
      microdistrictName: microdistrict.attributes.name,
    })),
  }));

export const formatToMicroDistrict = (
  data: StrapiFindResponse<MicroDistrictResponse>['data'],
): MicroDistrict[] =>
  data.map((microdistrict) => ({
    microDistrictId: microdistrict.id,
    microDistrictName: microdistrict.attributes.name,

    districts: {
      districtId: microdistrict.attributes.district.data.id,
      districtName: microdistrict.attributes.district.data.attributes.name,
    },
  }));

export const formatToHousesAndLotsCategories = (
  data: StrapiFindResponse<HousesAndLotsCategoryResponse>['data'],
): HousesAndLotsCategory[] =>
  data.map((category) => ({
    categoryName: category.attributes.name,
    belongTo: category.attributes.category,
    isRoot: !category.attributes.category,
    uid: category.attributes.uid,
  }));

export const formatToCommercialTransaction = (
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

export const formatToCommercialCategory = (
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
