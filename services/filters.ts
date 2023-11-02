import qs from 'qs';

import { District, MicroDistrict } from '@/types/Location';
import { StrapiFindResponse } from '@/types/StrapiFindResponse';

interface DistrictResponse {
  name: string;
  microdistricts: {
    data: Array<{
      id: string;
      attributes: {
        name: string;
      };
    }>;
  };
}

interface MicroDistrictResponse {
  name: string;
  district: {
    data: {
      id: string;
      attributes: {
        name: string;
      };
    };
  };
}

interface FindResponse {
  name: string;
}

const getDistricts = async (): Promise<District[]> => {
  const query = qs.stringify(
    {
      pagination: {
        limit: -1,
      },
      populate: 'microdistricts',
    },
    {
      encodeValuesOnly: true,
    },
  );

  const districtsResponse = await fetch(`${process.env.API_BASE_URL}/districts?${query}`, {
    cache: 'no-cache',
  });
  const { data } = (await districtsResponse.json()) as StrapiFindResponse<DistrictResponse>;

  return data.map((district) => ({
    districtId: district.id,
    districtName: district.attributes.name,
    microdistricts: district.attributes.microdistricts.data.map((microdistrict) => ({
      microdistrictId: microdistrict.id,
      microdistrictName: microdistrict.attributes.name,
    })),
  }));
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

  const microDistrictsResponse = await fetch(
    `${process.env.API_BASE_URL}/microdistricts?${query}`,
    {
      cache: 'no-cache',
    },
  );

  const { data } =
    (await microDistrictsResponse.json()) as StrapiFindResponse<MicroDistrictResponse>;

  return data.map((microdistrict) => ({
    microDistrictId: microdistrict.id,
    microDistrictName: microdistrict.attributes.name,

    districts: {
      districtId: microdistrict.attributes.district.data.id,
      districtName: microdistrict.attributes.district.data.attributes.name,
    },
  }));
};

const getMetro = async () => {
  const metroResponse = await fetch(`${process.env.API_BASE_URL}/metros`);
  const { data } = (await metroResponse.json()) as StrapiFindResponse<FindResponse>;

  return data.map((district) => district.attributes.name);
};

const getDirections = async () => {
  const directionsResponse = await fetch(`${process.env.API_BASE_URL}/directions`);
  const { data } = (await directionsResponse.json()) as StrapiFindResponse<FindResponse>;

  return data.map((district) => district.attributes.name);
};

const getHouseType = async () => {
  const directionsResponse = await fetch(
    `${process.env.API_BASE_URL}/houses-and-lots-categories?filters[category][$eqi]=Дома и коттеджи`,
  );
  const { data } = (await directionsResponse.json()) as StrapiFindResponse<FindResponse>;

  return data.map((district) => district.attributes.name);
};

export const getHousesAndLotsFiltersData = async () => {
  const [directions, houseTypes] = await Promise.all([getDirections(), getHouseType()]);

  return {
    directions,
    houseTypes,
  };
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
