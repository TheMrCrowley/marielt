import { getFullAddress } from '@/helpers/getFullAddress';
import { ProductType } from '@/types/Product';
import { StrapiImage } from '@/types/StrapiImage';

import { getCurrencyByType } from './getCurrency';
export interface Product {
  title: string;
  address: string;
  floor: number;
  maxFloor: number;
  totalArea: number;
  livingArea: number;
  priceCurrency: number;
  priceBYN: number;
  currency: 'USD' | 'EUR';
  productId: number;
  imgSrc: string;
}

interface GetActualApartmentsResponse {
  data: Array<{
    id: number;
    attributes: {
      id: number;
      price: number;
      name: string;
      locality: string;
      street?: string;
      house_number?: {
        number: string;
      };
      currency: 'USD' | 'EUR';
      parameters: {
        floor: number;
        floors_number: number;
        total_area: number;
        living_area: number;
      };
      image?: {
        data: Array<{
          attributes: StrapiImage;
        }>;
      };
    };
  }>;
}

const REVALIDATE_TIME = 10000;

// TODO change to get ACTUAL
const getActualApartments = async (): Promise<Product[]> => {
  const response = await fetch(`${process.env.API_BASE_URL}/apartments-items?populate=*`, {
    next: {
      revalidate: REVALIDATE_TIME,
    },
  });
  const { data } = (await response.json()) as GetActualApartmentsResponse;

  const currency = await getCurrencyByType('USD');

  return formatToActualProduct(data, currency);
};

const getActualHouses = async (): Promise<Product[]> => {
  const response = await fetch(`${process.env.API_BASE_URL}/houses-and-lots-items?populate=*`, {
    next: {
      revalidate: REVALIDATE_TIME,
    },
  });
  const { data } = (await response.json()) as GetActualApartmentsResponse;

  const currency = await getCurrencyByType('USD');

  return formatToActualProduct(data, currency);
};

const getActualCommercial = async (): Promise<Product[]> => {
  const response = await fetch(`${process.env.API_BASE_URL}/commercial-property-items?populate=*`, {
    next: {
      revalidate: REVALIDATE_TIME,
    },
  });
  const { data } = (await response.json()) as GetActualApartmentsResponse;

  const currency = await getCurrencyByType('EUR');

  return formatToActualProduct(data, currency);
};

export const getActualProductByType = async (type: ProductType): Promise<Product[]> => {
  switch (type) {
    case 'flats':
      return getActualApartments();
    case 'commercial':
      return getActualCommercial();
    case 'houses-and-lots':
      return getActualHouses();
  }
};

const formatToActualProduct = (
  data: GetActualApartmentsResponse['data'],
  currency: number,
): Product[] => {
  return data.map(({ attributes }) => ({
    address: getFullAddress({
      locality: attributes.locality,
      street: attributes.street,
      houseNumber: attributes.house_number?.number,
    }),
    floor: attributes.parameters.floor,
    maxFloor: attributes.parameters.floors_number,
    title: attributes.name,
    currency: attributes.currency,
    priceCurrency: attributes.price,
    priceBYN: attributes.price * currency,
    livingArea: attributes.parameters.living_area,
    totalArea: attributes.parameters.total_area,
    productId: attributes.id,
    // imgSrc: attributes?.image?.data[0]?.attributes?.url,
    imgSrc: attributes.image?.data ? attributes.image.data[0].attributes.url : '',
  }));
};
