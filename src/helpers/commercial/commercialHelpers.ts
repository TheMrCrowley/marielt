import qs from 'qs';

import { IMAGE_FIELDS_TO_POPULATE } from '@/src/api/BaseApi';
import { CommercialItemsStrapiResponse, CommercialStrapiResponse } from '@/src/api/commercial';
import { TransactionTypeValues } from '@/src/enums/CommercialFilters';
import { getFullAddress } from '@/src/helpers/addressHelpers';
import { formatToItemImage, formatToPageImages } from '@/src/helpers/formatToPageImages';
import { DefaultCommercialItem, DetailedCommercialItem } from '@/src/types/Commercial';
import { DefaultMapItem } from '@/src/types/Product';

export const convertToDefaultCommercialItem = (
  commercial: CommercialItemsStrapiResponse['data'],
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
    image: formatToItemImage(attributes.image?.data),
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

export const convertToDetailedCommercial = ({
  attributes,
  id,
}: CommercialStrapiResponse['data']): DetailedCommercialItem => ({
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
  images: formatToPageImages(attributes.image?.data),
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
    vat: attributes.parameters?.vat,
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
  metro: attributes.metro?.data?.attributes.name,
});

export const getDefaultCommercialListPopulateQuery = () => {
  return qs.stringify(
    {
      populate: {
        price_total: {
          populate: '*',
        },
        price_meter: {
          populate: '*',
        },
        image: {
          fields: IMAGE_FIELDS_TO_POPULATE,
        },
        house_number: {
          fields: ['number'],
        },
        parameters: {
          fields: ['plot_size', 'floor', 'floors_number', 'living_area'],
          populate: {
            premises_area: {
              populate: '*',
            },
          },
        },
        location: '*',
      },
    },
    { encodeValuesOnly: true },
  );
};

export const formatToCommercialMapItem = (
  items: CommercialItemsStrapiResponse['data'],
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
