import { flatCharacteristicsMap, getRoominessByStrapiValue } from '@/src/enums/FlatsFilters';
import {
  CommercialCategory,
  CommercialTransaction,
  DefaultCommercialItem,
} from '@/src/types/Commercial';
import { AvailableCurrencies } from '@/src/types/Currency';
import { DefaultFlatItem, DefaultMapFlatItem, DetailedFlatItem } from '@/src/types/Flats';
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
  StrapiFindOneResponse,
  StrapiFindResponse,
} from '@/src/types/StrapiTypes';

import { SearchResults } from './../types/Filters';
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
    image: Array.isArray(attributes?.image?.data)
      ? {
          height: attributes.image.data[0].attributes.height,
          width: attributes.image.data[0].attributes.width,
          url: attributes.image.data[0].attributes.url,
          placeholderUrl: attributes.image.data[0].attributes.placeholder,
        }
      : undefined,
    initialCurrency: attributes.currency || 'USD',
    parameters: {
      floor: attributes.parameters.floor,
      livingArea: attributes.parameters.living_area,
      maxFloor: attributes.parameters.floors_number,
      totalArea: attributes.parameters.total_area,
    },
    location: attributes.location?.coordinates,
  }));

export const formatToDefaultMapFlat = (
  flats: StrapiFindResponse<FlatStrapiResponse>['data'],
): DefaultMapFlatItem[] =>
  flats.map(({ attributes, id }) => ({
    id,
    price: attributes.price,
    initialCurrency: attributes.currency || 'USD',
    location: attributes.location?.coordinates,
  }));

export const formatToDetailedFlat = ({
  attributes,
  id,
}: StrapiFindOneResponse<FlatStrapiResponse>['data']): DetailedFlatItem => ({
  address: getFullAddress({
    locality: attributes.locality,
    houseNumber: attributes.house_number?.number,
    street: attributes.street,
  }),
  id,
  price: attributes.price,
  name: attributes.name,
  initialCurrency: attributes.currency || 'USD',
  parameters: {
    floor: attributes.parameters.floor,
    livingArea: attributes.parameters.living_area,
    maxFloor: attributes.parameters.floors_number,
    totalArea: attributes.parameters.total_area,
    constructionYear: attributes.parameters.construction_year,
    roominess: getRoominessByStrapiValue(attributes.parameters.roominess),
    bathroom: attributes.parameters.bathroom,
    houseType: attributes.parameters.house_type,
    finishing: attributes.parameters.finishing,
    ceilingHeight: attributes.parameters.ceiling_height,
    kitchenArea: attributes.parameters.kitchen_area,
    separateRooms: attributes.parameters.separate_rooms,
    shareInApartment: attributes.parameters.share_in_apartment,
    floorType: attributes.parameters.floor_type,
    balconyArea: attributes.parameters.balcony_area,
    balcony: attributes.parameters.balcony,
    flooring: attributes.parameters.flooring,
    layout: attributes.parameters.layout,
    levelNumber: attributes.parameters.level_number,
    majorRenovationYear: attributes.parameters.major_renovation_year,
    snbArea: attributes.parameters.snb_area,
    telephone: attributes.parameters.telephone,
  },
  additionalInfo: attributes.additional_info?.map((item) => ({ name: item.name })) || [],
  note: attributes.note,
  images: Array.isArray(attributes.image.data)
    ? attributes.image.data.map((item) => ({
        height: item.attributes.height as number,
        placeholderUrl: item.attributes.placeholder as string,
        url: item.attributes.url as string,
        width: item.attributes.width as number,
      }))
    : [],
});

export const formatToFlatCharacteristics = (
  flatItem: DetailedFlatItem,
): Array<{ name: string; value: string }> => {
  const result: Array<{ name: string; value: string }> = [];

  Object.entries(flatItem.parameters).forEach(([key, value]) => {
    const fn = flatCharacteristicsMap[key as keyof DefaultFlatItem['parameters']];
    if (!!value && fn) {
      result.push(fn(value));
    }
  });

  flatItem.additionalInfo.forEach(({ name }) => {
    result.push({ name, value: 'Есть' });
  });

  const keySet = new Set<string>();
  return result.filter(({ name }) => {
    if (keySet.has(name.toLocaleLowerCase())) {
      return false;
    }
    keySet.add(name.toLocaleLowerCase());
    return true;
  });
};

export const formatToDefaultCommercial = (
  commercial: StrapiFindResponse<CommercialStrapiResponse>['data'],
): DefaultCommercialItem[] =>
  commercial.map(
    ({
      attributes: {
        locality,
        house_number,
        street,
        currency,
        comm_tran,
        parameters,
        price_total,
        price_meter,
      },
      id,
    }) => ({
      address: getFullAddress({
        locality,
        houseNumber: house_number?.number,
        street,
      }),
      id,
      initialCurrency: currency || 'USD',
      transactionType: comm_tran?.data?.attributes?.uid,
      parameters: {
        totalArea: {
          maxArea: parameters.premises_area?.max_area,
          minArea: parameters.premises_area?.min_area,
        },
        plotSize: parameters.plot_size,
        floor: parameters.floor,
        maxFloor: parameters.floors_number,
        pricePerMeter: {
          from: price_meter?.from,
          to: price_meter?.to,
        },
        totalPrice: {
          from: price_total?.from,
          to: price_total?.to,
        },
      },
    }),
  );

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

export const formatResponseToSearchResult = (
  data:
    | StrapiFindResponse<FlatStrapiResponse>['data']
    | StrapiFindResponse<HousesAndLotsStrapiResponse>['data']
    | StrapiFindResponse<CommercialStrapiResponse>['data'],
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

    if (street && street.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
      streets.add(street);
    }

    if (region && region.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
      regions.add(region);
    }

    if (district && district.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
      districts.add(district);
    }

    if (locality && locality.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
      localities.add(locality);
    }
  });

  return {
    district_rb: Array.from(districts),
    locality: Array.from(localities),
    region: Array.from(regions),
    street: Array.from(streets),
  };
};
