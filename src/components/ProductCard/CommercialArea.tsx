import clsx from 'clsx';
import React from 'react';

import Typography from '@/src/components/common/Typography';
import { getPriceByCurrencySign } from '@/src/helpers/currencyHelpers';
import { useCurrency } from '@/src/store/currency';
import { AvailableCurrencies } from '@/src/types/Currency';

import CardFloor from './CardFloor';

interface CommercialAreaProps {
  totalArea: {
    minArea?: string;
    maxArea?: string;
  };
  totalPrice: boolean;
  pricePerMeter: {
    from?: string;
    to?: string;
  };
  initialCurrency: AvailableCurrencies;
  plotSize?: string;
  floor?: string;
  maxFloor?: string;
}

const CommercialArea = ({
  totalArea: { maxArea, minArea },
  plotSize,
  floor,
  maxFloor,
  totalPrice,
  pricePerMeter,
  initialCurrency,
}: CommercialAreaProps) => {
  const { selectedCurrency, rates } = useCurrency();

  if (!maxArea && !minArea && !plotSize) {
    return null;
  }

  const renderTotalArea = () => {
    if (!minArea) {
      return null;
    }

    return (
      <div className={clsx('flex', 'flex-col')}>
        <Typography fontSize={14} fontWeight="medium">
          {minArea}
          {maxArea && `-${maxArea}`}
          <span className={clsx('text-xs', 'opacity-50')}>м²</span>
        </Typography>
        <p className={clsx('text-white', 'text-xs', 'font-light')}>площадь</p>
      </div>
    );
  };

  const renderPlotSize = () => {
    if (minArea || !plotSize) {
      return null;
    }

    return (
      <Typography fontSize={14} fontWeight="light" className="flex gap-x-1">
        Площадь участка:{' '}
        <Typography fontSize={14} fontWeight="medium">
          {plotSize}
        </Typography>{' '}
        <span className={clsx('opacity-50')}>сот.</span>
      </Typography>
    );
  };

  const renderPricePerMeter = () => {
    if (!pricePerMeter.from || !totalPrice) {
      return null;
    }

    return (
      <div className={clsx('flex', 'flex-col')}>
        <Typography fontSize={14} fontWeight="medium">
          {pricePerMeter.from && pricePerMeter.to && 'от'}{' '}
          {getPriceByCurrencySign(+pricePerMeter.from, initialCurrency, selectedCurrency, rates)}
        </Typography>{' '}
        <p className={clsx('text-white', 'text-xs', 'font-light')}>за м²</p>
      </div>
    );
  };

  return (
    <div className={clsx('flex', 'items-start', 'justify-start', 'gap-4')}>
      {renderTotalArea()}
      {renderPlotSize()}
      {renderPricePerMeter()}
      <CardFloor floor={floor} maxFloor={maxFloor} />
    </div>
  );
};

export default CommercialArea;
