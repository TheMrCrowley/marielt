import qs from 'qs';

import { IMAGE_FIELDS_WITH_FORMATS } from '@/src/api/BaseApi';
import { FlatItemsStrapiResponse, FlatStrapiResponse } from '@/src/api/flats';
import { getFullAddress } from '@/src/helpers/addressHelpers';
import { formatToItemImage, formatToPageImages } from '@/src/helpers/formatToPageImages';
import { DefaultFlatItem, DetailedFlatItem } from '@/src/types/Flats';

export const convertToDefaultFlatItem = (
  flats: FlatItemsStrapiResponse['data'],
): DefaultFlatItem[] =>
  flats.map(({ attributes, id }) => ({
    address: getFullAddress({
      street: attributes.street,
      houseNumber: attributes.house_number?.number,
      locality: attributes.locality,
      region: attributes.region?.data.attributes.name,
    }),
    id,
    metro: attributes.metro?.data?.attributes.name,
    price: attributes.price,
    name: attributes.name,
    image: formatToItemImage(attributes.image.data),
    initialCurrency: attributes.currency || 'USD',
    parameters: {
      floor: attributes?.parameters?.floor,
      livingArea: attributes?.parameters?.living_area,
      maxFloor: attributes?.parameters?.floors_number,
      totalArea: attributes?.parameters?.total_area,
    },
    location: attributes.location?.coordinates,
  }));

export const convertToDetailedFlatItem = ({
  attributes,
  id,
}: FlatStrapiResponse['data']): DetailedFlatItem => ({
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
    parking: attributes.parameters.parking,
    lastFloor: attributes.parameters.is_last_floor,
    furniture: attributes.parameters.furniture,
    bargain: attributes.bargain,
    propertyType: attributes.property_type,
    saleTerms: attributes.sale_terms,
    contractNumber: attributes.contract_number,
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
  metro: attributes.metro?.data?.attributes.name,
});

export const getDefaultFlatListPopulateQuery = () => {
  return qs.stringify(
    {
      populate: {
        image: {
          fields: IMAGE_FIELDS_WITH_FORMATS,
        },
        house_number: {
          fields: ['number'],
        },
        parameters: {
          fields: ['floor', 'living_area', 'floors_number', 'total_area'],
        },
        location: '*',
        metro: {
          fields: ['name'],
        },
      },
    },
    { encodeValuesOnly: true },
  );
};
