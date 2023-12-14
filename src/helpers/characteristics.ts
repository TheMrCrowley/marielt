import { commercialCharacteristicsMap } from '@/src/enums/CommercialFilters';
import { DetailedCommercialItem } from '@/src/types/Commercial';

import { formatItemToCharacteristics } from './formatters';

export const getCommercialCharacteristics = (commercial: DetailedCommercialItem) => {
  const characteristics = [];
  if (commercial.premisesArea?.max || commercial.premisesArea?.min) {
    characteristics.push({
      name: 'Площадь помещений',
      value: commercial.premisesArea.max
        ? `${commercial.premisesArea.min}-${commercial.premisesArea.max} м²`
        : `${commercial.premisesArea.min} м²`,
    });
  }

  if (commercial.separateRooms?.from || commercial.separateRooms?.to) {
    characteristics.push({
      name: 'Раздельных помещений',
      value: commercial.separateRooms.to
        ? `${commercial.separateRooms.from}-${commercial.separateRooms.to}`
        : `${commercial.separateRooms.from}`,
    });
  }

  if (commercial.parameters.floor || commercial.parameters.maxFloor) {
    characteristics.push({
      name: commercial.parameters.maxFloor ? 'Этаж/этажность' : 'Этаж',
      value: commercial.parameters.maxFloor
        ? `${commercial.parameters.floor}/${commercial.parameters.maxFloor}`
        : `${commercial.parameters.floor}`,
    });
  }

  return [
    ...characteristics,
    ...formatItemToCharacteristics(commercial, commercialCharacteristicsMap),
  ];
};
