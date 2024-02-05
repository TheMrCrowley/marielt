import qs from 'qs';

import { IMAGE_FIELDS_WITH_FORMATS } from '@/src/api/BaseApi';
import { HouseStrapiResponse, HouseItemsStrapiResponse } from '@/src/api/house';
import { getFullAddress } from '@/src/helpers/addressHelpers';
import { formatToItemImage, formatToPageImages } from '@/src/helpers/formatToPageImages';
import { DefaultHousesAndLotsItem, DetailedHousesAndLotsItem } from '@/src/types/HousesAndLots';

export const convertToDefaultHouseItem = (
  housesAndLots: HouseItemsStrapiResponse['data'],
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
        metro,
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
      metro: metro?.data?.attributes.name,
      initialCurrency: currency || 'USD',
      image: formatToItemImage(image?.data),
      name,
      price,
      parameters: {
        plotSize: parameters?.plot_size,
        kitchenArea: parameters?.kitchen_area,
        livingArea: parameters?.living_area,
        totalArea: parameters?.total_area,
      },
    }),
  );

export const convertToDetailedHouseItem = ({
  attributes,
  id,
}: HouseStrapiResponse['data']): DetailedHousesAndLotsItem => ({
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
    bargain: attributes.bargain,
    propertyType: attributes.land_status,
    saleTerms: attributes.sale_terms,
    contractNumber: attributes.contract_number,
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
  images: formatToPageImages(attributes.image?.data),
  distance: attributes.distance,
  video: attributes.video_link ? JSON.parse(attributes.video_link) : undefined,
  metro: attributes.metro?.data?.attributes.name,
});

export const getDefaultHouseListPopulateQuery = () => {
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
          fields: ['plot_size', 'kitchen_area', 'living_area', 'total_area'],
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
