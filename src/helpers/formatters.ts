import { CommercialItemsStrapiResponse } from '@/src/api/commercial';
import { FlatItemsStrapiResponse } from '@/src/api/flats';
import { HouseItemsStrapiResponse } from '@/src/api/house';
import {
  CommercialCategory,
  CommercialCategoryResponse,
  CommercialTransaction,
  CommercialTransactionResponse,
  DetailedCommercialItem,
} from '@/src/types/Commercial';
import { AvailableCurrencies } from '@/src/types/Currency';
import { DistrictResponse, MicroDistrictResponse, SearchResults } from '@/src/types/Filters';
import { DetailedFlatItem } from '@/src/types/Flats';
import {
  DetailedHousesAndLotsItem,
  HousesAndLotsCategory,
  HousesAndLotsCategoryResponse,
} from '@/src/types/HousesAndLots';
import { District, MicroDistrict } from '@/src/types/Location';
import { DefaultMapItem } from '@/src/types/Product';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

export const formatToDefaultMapItem = (
  items: FlatItemsStrapiResponse['data'] | HouseItemsStrapiResponse['data'],
): DefaultMapItem[] =>
  items.map(({ attributes, id }) => ({
    id,
    price: attributes.price,
    initialCurrency: attributes.currency || 'USD',
    location: attributes.coordinates
      ? {
          lat: attributes.coordinates.latitude,
          lng: attributes.coordinates.longitude,
        }
      : undefined,
  }));

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
    metros: district.attributes.metros.data.map((metro) => ({
      metroId: metro.id,
      metroName: metro.attributes.name,
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
    commercialCategories: transaction.attributes.comm_categories.data.map((category) => ({
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

//TODO add to many places
const normalizeAddressItem = (item: string) =>
  item
    .split(' ')
    .filter(Boolean)
    .map((l) => l.trim())
    .join(' ');

export const formatResponseToSearchResult = (
  data:
    | FlatItemsStrapiResponse['data']
    | HouseItemsStrapiResponse['data']
    | CommercialItemsStrapiResponse['data'],
  value: string,
): SearchResults => {
  const streets = new Set<string>();
  const localities = new Set<string>();
  const regions = new Set<string>();
  const districts = new Set<string>();

  data.forEach((item) => {
    const street = item?.attributes.street;
    const region = item?.attributes?.region?.data?.attributes?.name;
    const district = item?.attributes.district_rb;
    const locality = item?.attributes.locality;

    if (street && street.toLowerCase().includes(value.toLowerCase())) {
      streets.add(normalizeAddressItem(street));
    }

    if (region && region.toLowerCase().includes(value.toLowerCase())) {
      regions.add(normalizeAddressItem(region));
    }

    if (district && district.toLowerCase().includes(value.toLowerCase())) {
      districts.add(normalizeAddressItem(district));
    }

    if (locality && locality.toLowerCase().includes(value.toLowerCase())) {
      localities.add(normalizeAddressItem(locality));
    }
  });

  return {
    district_rb: Array.from(districts),
    locality: Array.from(localities),
    region: Array.from(regions),
    street: Array.from(streets),
  };
};

export function formatItemToCharacteristics<
  T extends DetailedFlatItem | DetailedHousesAndLotsItem | DetailedCommercialItem,
>(
  item: T,
  map: Partial<
    Record<keyof T['parameters'], (value?: string | boolean) => { name: string; value: string }>
  >,
) {
  const result: Array<{ name: string; value: string }> = [];

  Object.entries(item.parameters).forEach(([key, value]) => {
    const fn = map[key as keyof T['parameters']];
    if (!!value && fn) {
      result.push(fn(value));
    }
  });

  item.additionalInfo
    ?.filter((info) => !!info.name)
    .forEach(({ name }) => {
      result.push({ name, value: 'Да' });
    });

  const keySet = new Set<string>();

  return result.filter(({ name }) => {
    if (keySet.has(name.toLowerCase())) {
      return false;
    }
    keySet.add(name.toLowerCase());
    return true;
  });
}
