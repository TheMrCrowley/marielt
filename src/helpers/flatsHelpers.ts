import { getFullAddress } from '@/src/helpers/addressHelpers';
import { FlatStrapiResponse, DefaultFlatItem } from '@/src/types/Flats';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

export const formatToDefaultFlat = (
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
