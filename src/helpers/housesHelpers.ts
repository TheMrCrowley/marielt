import { HousesAndLotsStrapiResponse, DefaultHousesAndLotsItem } from '@/src/types/HousesAndLots';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

import { getFullAddress } from './addressHelpers';

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
