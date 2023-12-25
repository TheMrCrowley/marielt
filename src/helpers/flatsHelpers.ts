import qs from 'qs';

import { FlatStrapiResponse } from '@/src/api/FlatsApi';
import { getFullAddress } from '@/src/helpers/addressHelpers';
import { DefaultFlatItem, DetailedFlatItem } from '@/src/types/Flats';
import { StrapiFindOneResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';

import { formatToPageImages } from './formatToPageImages';
import { IMAGE_FIELDS_TO_POPULATE } from './queryHelpers';

export const convertToDefaultFlatItem = (
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

export const convertToDetailedFlatItem = ({
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
  images: formatToPageImages(attributes.image.data),
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

export const getDefaultFlatListPopulateQuery = () => {
  return qs.stringify(
    {
      populate: {
        image: {
          fields: IMAGE_FIELDS_TO_POPULATE,
        },
        house_number: {
          fields: ['number'],
        },
        parameters: {
          fields: ['floor', 'living_area', 'floors_number', 'total_area'],
        },
        location: '*',
      },
    },
    { encodeValuesOnly: true },
  );
};
