import {
  CommercialCategory,
  CommercialTransaction,
  DefaultCommercialItem,
} from '@/src/types/Commercial';
import { AvailableCurrencies } from '@/src/types/Currency';
import { SearchResults } from '@/src/types/Filters';
import { DefaultFlatItem, DetailedFlatItem } from '@/src/types/Flats';
import {
  DefaultHousesAndLotsItem,
  DetailedHousesAndLotsItem,
  HousesAndLotsCategory,
} from '@/src/types/HousesAndLots';
import { District, MicroDistrict } from '@/src/types/Location';
import { DefaultMapItem } from '@/src/types/Product';
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

import { getSmallAddress, getFullAddress } from './addressHelpers';

export const formatToDefaultFlat = (
  flats: StrapiFindResponse<FlatStrapiResponse>['data'],
): DefaultFlatItem[] =>
  flats.map(({ attributes, id }) => ({
    address: getSmallAddress({
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

export const formatToDefaultMapItem = (
  items:
    | StrapiFindResponse<FlatStrapiResponse>['data']
    | StrapiFindResponse<HousesAndLotsStrapiResponse>['data'],
): DefaultMapItem[] =>
  items.map(({ attributes, id }) => ({
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
    region: attributes.region?.data.attributes.name,
    districtRb: attributes.district_rb,
    locality: attributes.locality,
    district: attributes.district?.data.attributes.name,
    street: attributes.street,
    houseNumber: attributes.house_number?.number,
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
    roominess: attributes.parameters.roominess,
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
  location: attributes.location?.coordinates,
  detailedDescription: attributes.detailed_description,
  images: Array.isArray(attributes.image.data)
    ? attributes.image.data.map((item) => ({
        height: item.attributes.height as number,
        placeholderUrl: item.attributes.placeholder as string,
        url: item.attributes.url as string,
        width: item.attributes.width as number,
      }))
    : [],
  agents: {
    fullName: attributes.agents.data[0].attributes.full_name,
    phone1: attributes.agents.data[0].attributes.phone1,
    branch: attributes.agents.data[0].attributes.branch,
    phone2: attributes.agents.data[0].attributes.phone2,
    position: attributes.agents.data[0].attributes.position,
  },
  video: attributes.video_link ? JSON.parse(attributes.video_link) : undefined,
});

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
      address: getSmallAddress({
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
      address: getSmallAddress({
        locality,
        houseNumber: house_number?.number,
        street,
      }),
      initialCurrency: currency || 'USD',
      image:
        image && Array.isArray(image.data)
          ? {
              height: image.data[0].attributes.height,
              width: image.data[0].attributes.width,
              url: image.data[0].attributes.url,
              placeholderUrl: image.data[0].attributes.placeholder,
            }
          : undefined,
      name,
      price,
      parameters: {
        plotSize: parameters.plot_size,
        kitchenArea: parameters.kitchen_area,
        livingArea: parameters.living_area,
        totalArea: parameters.total_area,
      },
    }),
  );

export const formatToDetailedHousesAndLots = ({
  attributes,
  id,
}: StrapiFindOneResponse<HousesAndLotsStrapiResponse>['data']): DetailedHousesAndLotsItem => ({
  address: getFullAddress({
    region: attributes.region?.data.attributes.name,
    districtRb: attributes.district_rb,
    village: attributes.village_council,
    locality: attributes.locality,
    street: attributes.street,
    houseNumber: attributes.house_number?.number,
  }),
  id,
  price: attributes.price,
  name: attributes.name,
  initialCurrency: attributes.currency || 'USD',
  parameters: {
    plotSize: attributes.parameters.plot_size,
    livingArea: attributes.parameters.living_area,
    kitchenArea: attributes.parameters.kitchen_area,
    totalArea: attributes.parameters.total_area,
    constructionYear: attributes.parameters.construction_year,
    levelNumber: attributes.parameters.level_number,
    roofMaterial: attributes.parameters.roof_material,
    wallMaterial: attributes.parameters.wall_material,
    wallMaterialAdd: attributes.parameters.wall_material_add,
    roomsNumber: attributes.parameters.rooms_number,
    heating: attributes.parameters.heating,
    gas: attributes.parameters.gas,
    water: attributes.parameters.water,
    waterAdd: attributes.parameters.water_add,
    sewerage: attributes.parameters.sewerage,
    sewerageAdd: attributes.parameters.sewerage_add,
    electricity: attributes.parameters.electricity,
    telephone: attributes.parameters.telephone,
    balcony: attributes.parameters.balcony,
    parking: attributes.parameters.parking,
    readinessPercentage: attributes.parameters.readiness_percentage,
    builtUpArea:
      attributes.parameters.built_up_area &&
      Object.values(attributes.parameters.built_up_area).every((item) => !!item)
        ? (
            +attributes.parameters.built_up_area.length * +attributes.parameters.built_up_area.width
          ).toString()
        : '',
  },
  additionalInfo: attributes.additional_info?.map((item) => ({ name: item.name })) || [],
  note: attributes.note,
  detailedDescription: attributes.detailed_description,
  agent: {
    fullName: attributes.agents.data[0].attributes.full_name,
    phone1: attributes.agents.data[0].attributes.phone1,
    branch: attributes.agents.data[0].attributes.branch,
    phone2: attributes.agents.data[0].attributes.phone2,
    position: attributes.agents.data[0].attributes.position,
  },
  houseCategories: {
    category: attributes.house_categories.data[0].attributes.category,
    name: attributes.house_categories.data[0].attributes.name,
  },
  direction: attributes.direction?.data?.attributes.name,
  location: attributes.location?.coordinates,
  images: Array.isArray(attributes?.image?.data)
    ? attributes!.image!.data.map((item) => ({
        height: item.attributes.height as number,
        placeholderUrl: item.attributes.placeholder as string,
        url: item.attributes.url as string,
        width: item.attributes.width as number,
      }))
    : [],
  video: attributes.video_link ? JSON.parse(attributes.video_link) : undefined,
});

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

export function formatItemToCharacteristics<T extends DetailedFlatItem | DetailedHousesAndLotsItem>(
  item: T,
  map: Partial<Record<keyof T['parameters'], (value: string) => { name: string; value: string }>>,
) {
  const result: Array<{ name: string; value: string }> = [];

  Object.entries(item.parameters).forEach(([key, value]) => {
    const fn = map[key as keyof T['parameters']];
    if (!!value && fn) {
      result.push(fn(value));
    }
  });

  item.additionalInfo.forEach(({ name }) => {
    result.push({ name, value: 'Да' });
  });

  const keySet = new Set<string>();
  return result.filter(({ name }) => {
    if (keySet.has(name.toLocaleLowerCase())) {
      return false;
    }
    keySet.add(name.toLocaleLowerCase());
    return true;
  });
}
