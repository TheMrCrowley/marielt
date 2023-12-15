import { commercialCharacteristicsMap } from '@/src/enums/CommercialFilters';
import { getPriceByCurrencyMonetary } from '@/src/helpers/currencyHelpers';
import { DetailedCommercialItem } from '@/src/types/Commercial';
import { AvailableCurrencies } from '@/src/types/Currency';

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

export const getCommercialPriceValues = ({
  initialCurrency,
  priceMeter,
  rates,
  totalPrice,
}: {
  totalPrice: DetailedCommercialItem['totalPrice'];
  priceMeter: DetailedCommercialItem['pricePerMeter'];
  initialCurrency: AvailableCurrencies;
  rates: {
    usd: number;
    eur: number;
    rub: number;
  };
}): { main: string[]; additional: string[] | null } => {
  const result: { main: string[]; additional: string[] | null } = {
    main: [],

    additional: null,
  };

  if (totalPrice) {
    if (totalPrice.from && !totalPrice.to) {
      result.main.push(
        getPriceByCurrencyMonetary(+totalPrice.from, initialCurrency, initialCurrency, rates),
        getPriceByCurrencyMonetary(+totalPrice.from, initialCurrency, 'BYN', rates),
      );
    }

    if (totalPrice.from && totalPrice.to) {
      result.main.push(
        `${getPriceByCurrencyMonetary(
          +totalPrice.from,
          initialCurrency,
          initialCurrency,
          rates,
        )} - ${getPriceByCurrencyMonetary(
          +totalPrice.to,
          initialCurrency,
          initialCurrency,
          rates,
        )}`,
        getPriceByCurrencyMonetary(+totalPrice.from, initialCurrency, 'BYN', rates),
      );
    }

    if (priceMeter) {
      if (priceMeter.from && !priceMeter.to) {
        result.additional = [
          `${getPriceByCurrencyMonetary(
            +priceMeter.from,
            initialCurrency,
            initialCurrency,
            rates,
          )} за м²`,
          `${getPriceByCurrencyMonetary(+priceMeter.from, initialCurrency, 'BYN', rates)} за м²`,
        ];
      }
      if (priceMeter.from && priceMeter.to) {
        result.additional = [
          `${getPriceByCurrencyMonetary(
            +priceMeter.from,
            initialCurrency,
            initialCurrency,
            rates,
          )} - ${getPriceByCurrencyMonetary(
            +priceMeter.to,
            initialCurrency,
            initialCurrency,
            rates,
          )} за м²`,
          `${getPriceByCurrencyMonetary(+priceMeter.from, initialCurrency, 'BYN', rates)} за м²`,
        ];
      }
    }
  } else {
    if (priceMeter) {
      if (priceMeter.from && !priceMeter.to) {
        result.main.push(
          `${getPriceByCurrencyMonetary(
            +priceMeter.from,
            initialCurrency,
            initialCurrency,
            rates,
          )} за м²`,
          `${getPriceByCurrencyMonetary(+priceMeter.from, initialCurrency, 'BYN', rates)} за м²`,
        );
      }

      if (priceMeter.from && priceMeter.to) {
        result.main.push(
          `${getPriceByCurrencyMonetary(
            +priceMeter.from,
            initialCurrency,
            initialCurrency,
            rates,
          )} - ${getPriceByCurrencyMonetary(
            +priceMeter.to,
            initialCurrency,
            initialCurrency,
            rates,
          )} за м²`,
          `${getPriceByCurrencyMonetary(+priceMeter.from, initialCurrency, 'BYN', rates)} за м²`,
        );
      }
    }
  }

  return result;
};
