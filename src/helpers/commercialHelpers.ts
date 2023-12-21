import { CommercialStrapiResponse, DefaultCommercialItem } from '@/src/types/Commercial';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

import { getFullAddress } from './addressHelpers';

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
