import { TransactionTypeValues } from '@/src/enums/CommercialFilters';
import {
  CommercialCategory,
  CommercialCategoryResponse,
  CommercialStrapiResponse,
  CommercialTransaction,
  CommercialTransactionResponse,
  DefaultCommercialItem,
  DetailedCommercialItem,
} from '@/src/types/Commercial';
import { AvailableCurrencies } from '@/src/types/Currency';
import { DistrictResponse, MicroDistrictResponse, SearchResults } from '@/src/types/Filters';
import { DefaultFlatItem, DetailedFlatItem, FlatStrapiResponse } from '@/src/types/Flats';
import {
  DefaultHousesAndLotsItem,
  DetailedHousesAndLotsItem,
  HousesAndLotsCategory,
  HousesAndLotsCategoryResponse,
  HousesAndLotsStrapiResponse,
} from '@/src/types/HousesAndLots';
import { District, MicroDistrict } from '@/src/types/Location';
import { DefaultMapItem } from '@/src/types/Product';
import { StrapiFindResponse, StrapiFindOneResponse } from '@/src/types/StrapiTypes';

import { getFullAddress } from './addressHelpers';

export const formatToDefaultFlat = (
  flats: StrapiFindResponse<FlatStrapiResponse>['data'],
): DefaultFlatItem[] =>
  flats.map(({ attributes, id }) => ({
    address: getFullAddress({
      street: attributes.street,
      houseNumber: attributes.house_number?.number,
      locality: attributes.locality,
      region: attributes.region?.data.attributes.name,
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
    location: attributes.coordinates
      ? {
          lat: attributes.coordinates.latitude,
          lng: attributes.coordinates.longitude,
        }
      : undefined,
  }));

export const formatToCommercialMapItem = (
  items: StrapiFindResponse<CommercialStrapiResponse>['data'],
): DefaultMapItem[] =>
  items.map(({ attributes, id }) => ({
    id,
    price: attributes.price_total?.from || attributes.price_meter?.from,
    initialCurrency: attributes.currency || 'USD',
    location: attributes.coordinates
      ? {
          lat: attributes.coordinates.latitude,
          lng: attributes.coordinates.longitude,
        }
      : undefined,
  }));

export const formatToDetailedFlat = ({
  attributes,
  id,
}: StrapiFindOneResponse<FlatStrapiResponse>['data']): DetailedFlatItem => ({
  address: getFullAddress({
    region: attributes.region?.data?.attributes.name,
    districtRb: attributes.district_rb,
    locality: attributes.locality,
    district: attributes.district?.data?.attributes.name,
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
  location: attributes.coordinates
    ? { lat: attributes.coordinates.latitude, lng: attributes.coordinates.longitude }
    : undefined,
  detailedDescription: attributes.detailed_description,
  images:
    attributes.image.data && attributes.image.data.length
      ? attributes.image.data.map((item) => ({
          height: item.attributes.height as number,
          placeholderUrl: item.attributes.placeholder as string,
          url: item.attributes.url as string,
          width: item.attributes.width as number,
        }))
      : [],
  agents:
    attributes.agents?.data && attributes.agents.data.length
      ? {
          fullName: attributes.agents.data[0].attributes.full_name,
          phone1: attributes.agents.data[0].attributes.phone1,
          branch: attributes.agents.data[0].attributes.branch,
          phone2: attributes.agents.data[0].attributes.phone2,
          position: attributes.agents.data[0].attributes.position,
        }
      : undefined,
  video: attributes.video_link ? JSON.parse(attributes.video_link) : undefined,
});

export const formatToDefaultCommercial = (
  commercial: StrapiFindResponse<CommercialStrapiResponse>['data'],
): DefaultCommercialItem[] =>
  commercial.map(({ attributes, id }) => ({
    name: attributes.name,
    address: getFullAddress({
      region: attributes.region?.data.attributes.name,
      districtRb: attributes.district_rb,
      locality: attributes.locality,
      district: attributes.district?.data.attributes.name,
      street: attributes.street,
      houseNumber: attributes.house_number?.number,
    }),
    id,
    initialCurrency: attributes.currency || 'USD',
    transactionType: attributes.comm_tran?.data?.attributes?.uid!,
    image: Array.isArray(attributes.image?.data)
      ? {
          height: attributes.image!.data[0].attributes.height,
          width: attributes.image!.data[0].attributes.width,
          url: attributes.image!.data[0].attributes.url,
          placeholderUrl: attributes.image!.data[0].attributes.placeholder,
        }
      : undefined,
    parameters: {
      plotSize: attributes.parameters?.plot_size,
      floor: attributes.parameters?.floor,
      maxFloor: attributes.parameters?.floors_number,
    },
    totalArea: {
      maxArea: attributes.parameters?.premises_area?.max_area,
      minArea: attributes.parameters?.premises_area?.min_area,
    },
    pricePerMeter: {
      from: attributes.price_meter?.from,
      to: attributes.price_meter?.to,
    },
    totalPrice: {
      from: attributes.price_total?.from,
      to: attributes.price_total?.to,
    },
  }));

export const formatToDetailedCommercialItem = ({
  attributes,
  id,
}: StrapiFindOneResponse<CommercialStrapiResponse>['data']): DetailedCommercialItem => ({
  location: attributes.coordinates
    ? {
        lat: attributes.coordinates.latitude,
        lng: attributes.coordinates.longitude,
      }
    : undefined,
  agents:
    attributes.agents?.data && attributes.agents.data.length
      ? {
          fullName: attributes.agents.data[0].attributes.full_name,
          phone1: attributes.agents.data[0].attributes.phone1,
          branch: attributes.agents.data[0].attributes.branch,
          phone2: attributes.agents.data[0].attributes.phone2,
          position: attributes.agents.data[0].attributes.position,
        }
      : undefined,
  address: getFullAddress({
    region: attributes.region?.data.attributes.name,
    districtRb: attributes.district_rb,
    locality: attributes.locality,
    district: attributes.district?.data?.attributes.name,
    street: attributes.street,
    houseNumber: attributes.house_number?.number,
  }),
  id,
  initialCurrency: attributes.currency || 'USD',
  transactionType: attributes.comm_tran?.data?.attributes?.name! as TransactionTypeValues,
  images: Array.isArray(attributes.image?.data)
    ? attributes
        .image!.data.filter((item) => !item.attributes.url.includes('.html'))
        .map(({ attributes: imageAttributes }) => ({
          height: imageAttributes.height,
          width: imageAttributes.width,
          url: imageAttributes.url,
          placeholderUrl: imageAttributes.placeholder,
        }))
    : [],
  parameters: {
    plotSize: attributes.parameters?.plot_size,
    floor: attributes.parameters?.floor,
    maxFloor: attributes.parameters?.floors_number,
    bathroom: attributes.parameters?.bathroom,
    ceilingHeight: attributes.parameters?.ceiling_height,
    constructionYear: attributes.parameters?.construction_year,
    daylight: attributes.parameters?.daylight,
    electricity: attributes.parameters?.electricity,
    equipment: attributes.parameters?.equipment,
    finishing: attributes.parameters?.finishing,
    furniture: attributes.parameters?.furniture,
    gas: attributes.parameters?.gas,
    heating: attributes.parameters?.heating,
    isGroundFloor: attributes.parameters?.is_ground_floor,
    location: attributes.parameters?.location,
    ramp: attributes.parameters?.ramp,
    separateEntrance: attributes.parameters?.separate_entrance,
    sewerage: attributes.parameters?.sewerage,
    ventilation: attributes.parameters?.ventilation,
    wallMaterial: attributes.parameters?.wall_material,
    water: attributes.parameters?.water,
    payback: attributes?.business?.payback,
    profitability: attributes?.business?.profitability,
    rentAmountMonth: attributes?.business?.rent_amount_month,
    rentAmountYear: attributes?.business?.rent_amount_year,
  },
  pricePerMeter:
    attributes.price_meter?.from || attributes.price_meter?.to
      ? {
          from: attributes.price_meter?.from,
          to: attributes.price_meter?.to,
        }
      : undefined,
  totalPrice:
    attributes.price_total?.from || attributes.price_total?.to
      ? {
          from: attributes.price_total?.from,
          to: attributes.price_total?.to,
        }
      : undefined,
  premisesArea: attributes.parameters?.premises_area && {
    min: attributes.parameters.premises_area.min_area,
    max: attributes.parameters.premises_area.max_area,
  },
  separateRooms: attributes.parameters?.separate_rooms && {
    from: attributes.parameters.separate_rooms.from,
    to: attributes.parameters.separate_rooms.to,
  },
  distance: attributes.distance,
  direction: attributes.direction?.data?.attributes.name,
  rootType: Array.isArray(attributes.comm_categories?.data)
    ? attributes.comm_categories?.data.filter((item) => !item?.attributes.category)[0]?.attributes
        .name
    : undefined,
  type: Array.isArray(attributes.comm_categories?.data)
    ? attributes.comm_categories?.data.filter((item) => item?.attributes.category)[0]?.attributes
        .name
    : undefined,
  totalArea: {
    maxArea: attributes.parameters?.premises_area?.max_area,
    minArea: attributes.parameters?.premises_area?.min_area,
  },
  additionalInfo: attributes.additional_info,
  name: attributes.name,
  note: attributes.note,
  detailedDescription: attributes.detailed_description,
  video: attributes.video_link ? JSON.parse(attributes.video_link) : undefined,
});

export const formatToDefaultHouseAndLotsItem = (
  housesAndLots: StrapiFindResponse<HousesAndLotsStrapiResponse>['data'],
): DefaultHousesAndLotsItem[] =>
  housesAndLots.map(
    ({
      attributes: {
        name,
        price,
        locality,
        street,
        house_number,
        currency,
        parameters,
        image,
        village_council,
        district_rb,
        region,
      },
      id,
    }) => ({
      id,
      address: getFullAddress({
        street: street,
        houseNumber: house_number?.number,
        locality,
        village: village_council,
        districtRb: district_rb,
        region: region?.data.attributes.name,
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
    region: attributes.region?.data?.attributes.name,
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
    builtUpAreaLength: attributes.parameters.built_up_area?.length,
    builtUpAreaWidth: attributes.parameters.built_up_area?.width,
  },
  additionalInfo: attributes.additional_info?.map((item) => ({ name: item.name })) || [],
  note: attributes.note,
  detailedDescription: attributes.detailed_description,
  agents:
    attributes.agents?.data && attributes.agents.data.length
      ? {
          fullName: attributes.agents.data[0].attributes.full_name,
          phone1: attributes.agents.data[0].attributes.phone1,
          branch: attributes.agents.data[0].attributes.branch,
          phone2: attributes.agents.data[0].attributes.phone2,
          position: attributes.agents.data[0].attributes.position,
        }
      : undefined,
  rootType:
    attributes.house_categories?.data &&
    attributes.house_categories.data.find((item) => !item.attributes.category)?.attributes.name,
  type:
    attributes.house_categories?.data &&
    attributes.house_categories.data.find((item) => !!item.attributes.category)?.attributes.name,
  direction: attributes.direction?.data?.attributes.name,
  location: attributes.coordinates
    ? {
        lat: attributes.coordinates.latitude,
        lng: attributes.coordinates.longitude,
      }
    : undefined,
  images: Array.isArray(attributes?.image?.data)
    ? attributes!.image!.data.map((item) => ({
        height: item.attributes.height as number,
        placeholderUrl: item.attributes.placeholder as string,
        url: item.attributes.url as string,
        width: item.attributes.width as number,
      }))
    : [],
  distance: attributes.distance,
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
