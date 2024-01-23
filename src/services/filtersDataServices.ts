import qs from 'qs';

import {
  formatToCommercialCategory,
  formatToCommercialTransaction,
  formatToDistrict,
  formatToHousesAndLotsCategories,
  formatToMicroDistrict,
} from '@/src/helpers/formatters';
import {
  CommercialCategory,
  CommercialCategoryResponse,
  CommercialTransaction,
  CommercialTransactionResponse,
} from '@/src/types/Commercial';
import { DistrictResponse, MicroDistrictResponse, DirectionResponse } from '@/src/types/Filters';
import { HousesAndLotsCategoryResponse } from '@/src/types/HousesAndLots';
import { District, Metro, MicroDistrict } from '@/src/types/Location';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

const getDistricts = async (): Promise<District[]> => {
  const query = qs.stringify(
    {
      pagination: {
        limit: -1,
      },
      populate: ['metros', 'microdistricts'],
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.API_BASE_URL}/districts?${query}`;

  const districtsResponse = await fetch(url, {
    // cache: 'no-cache',
  });
  const { data } = (await districtsResponse.json()) as StrapiFindResponse<DistrictResponse>;

  return formatToDistrict(data);
};

const getMicroDistricts = async (): Promise<MicroDistrict[]> => {
  const query = qs.stringify(
    {
      pagination: {
        limit: -1,
      },
      populate: 'district',
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.API_BASE_URL}/microdistricts?${query}`;

  const microDistrictsResponse = await fetch(url, {
    // cache: 'no-cache',
  });

  const { data } =
    (await microDistrictsResponse.json()) as StrapiFindResponse<MicroDistrictResponse>;

  return formatToMicroDistrict(data);
};

const getMetro = async (): Promise<Metro[]> => {
  const query = qs.stringify(
    {
      pagination: {
        limit: -1,
      },
      populate: 'districts',
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.API_BASE_URL}/metros?${query}`;
  const metroResponse = await fetch(url, {
    // cache: 'no-cache'
  });

  const { data } = (await metroResponse.json()) as StrapiFindResponse<{
    name: string;
    districts: {
      data: Array<{
        id: string;
        attributes: {
          name: string;
        };
      }>;
    };
  }>;

  return data.map((metro) => ({
    metroName: metro.attributes.name,
    metroId: metro.id,
    districts: metro.attributes.districts.data.map((item) => ({
      districtId: item.id,
      districtName: item.attributes.name,
    })),
  }));
};

export const getFlatsFiltersData = async () => {
  const [district, microDistrict, metro] = await Promise.all([
    getDistricts(),
    getMicroDistricts(),
    getMetro(),
  ]);

  return {
    district,
    microDistrict,
    metro,
  };
};

const getDirections = async () => {
  const sortQuery = qs.stringify(
    {
      sort: 'name',
    },
    {
      encodeValuesOnly: true,
    },
  );
  const url = `${process.env.API_BASE_URL}/directions?${sortQuery}`;

  const directionsResponse = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });
  const { data } = (await directionsResponse.json()) as StrapiFindResponse<DirectionResponse>;

  return data.map((direction) => direction.attributes.name);
};

const getHouseAndLotsCategories = async () => {
  const query = qs.stringify(
    {
      pagination: {
        limit: -1,
      },
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.API_BASE_URL}/house-categories?${query}`;

  const directionsResponse = await fetch(url, {
    cache: 'no-cache',
  });

  const { data } =
    (await directionsResponse.json()) as StrapiFindResponse<HousesAndLotsCategoryResponse>;

  return formatToHousesAndLotsCategories(data);
};

export const getHousesAndLotsFiltersData = async () => {
  const [directions, housesAndLotasCategories] = await Promise.all([
    getDirections(),
    getHouseAndLotsCategories(),
  ]);

  return {
    directions,
    housesAndLotasCategories,
  };
};

const getCommercialTransactions = async (): Promise<Array<CommercialTransaction>> => {
  const query = qs.stringify(
    {
      populate: 'comm_categories',
      pagination: {
        limit: -1,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const response = await fetch(`${process.env.API_BASE_URL}/comm-trans?${query}`);

  const { data } = (await response.json()) as StrapiFindResponse<CommercialTransactionResponse>;
  return formatToCommercialTransaction(data);
};

const getCommercialCategories = async (): Promise<Array<CommercialCategory>> => {
  const query = qs.stringify(
    {
      populate: 'comm_trans',
      pagination: {
        limit: -1,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const response = await fetch(`${process.env.API_BASE_URL}/comm-categories?${query}`, {
    cache: 'no-cache',
  });

  const { data } = (await response.json()) as StrapiFindResponse<CommercialCategoryResponse>;
  return formatToCommercialCategory(data);
};

export const getCommercialFiltersData = async () => {
  const [transactions, categories, directions] = await Promise.all([
    getCommercialTransactions(),
    getCommercialCategories(),
    getDirections(),
  ]);

  return {
    transactions,
    categories,
    directions,
  };
};

export const getSearchFieldQuery = (value: string) => {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            locality: {
              $containsi: value,
            },
          },
          {
            street: {
              $containsi: value,
            },
          },
          {
            district_rb: {
              $containsi: value,
            },
          },
          {
            region: {
              name: {
                $containsi: value,
              },
            },
          },
        ],
      },
      populate: {
        fields: ['locality', 'street', 'district_rb'],
        region: {
          populate: 'name',
        },
      },
      pagination: {
        limit: -1,
      },
    },
    { encodeValuesOnly: true },
  );

  return query;
};
