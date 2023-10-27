import { StrapiFindResponse } from '@/types/StrapiFindResponse';

interface FindResponse {
  name: string;
}

const getDistricts = async () => {
  const districtsResponse = await fetch(
    `${process.env.API_BASE_URL}/districts?pagination[limit]=-1`,
  );
  const { data } = (await districtsResponse.json()) as StrapiFindResponse<FindResponse>;

  return data.map((district) => district.attributes.name);
};

const getMicroDistricts = async () => {
  const microDistrictsResponse = await fetch(
    `${process.env.API_BASE_URL}/microdistricts?pagination[limit]=-1`,
  );
  const { data } = (await microDistrictsResponse.json()) as StrapiFindResponse<FindResponse>;

  return data.map((district) => district.attributes.name);
};

const getMetro = async () => {
  const metroResponse = await fetch(`${process.env.API_BASE_URL}/metros`);
  const { data } = (await metroResponse.json()) as StrapiFindResponse<FindResponse>;

  return data.map((district) => district.attributes.name);
};

export const getFiltersData = async () => {
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
