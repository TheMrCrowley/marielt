import clsx from 'clsx';
import React from 'react';

import Typography from '@/src/components/common/Typography';
import { getPriceByCurrencySign } from '@/src/helpers/currencyHelpers';
import { useCurrency } from '@/src/store/currency';
import { AvailableCurrencies } from '@/src/types/Currency';

import CardFloor from './CardFloor';

interface CommercialAreaProps {
  totalArea?: {
    minArea?: string;
    maxArea?: string;
  };
  totalPrice?: boolean;
  pricePerMeter?: {
    from?: string;
    to?: string;
  };
  initialCurrency: AvailableCurrencies;
  plotSize?: string;
  floor?: string;
  maxFloor?: string;
  vat?: string;
}

const CommercialArea = ({
  totalArea,
  plotSize,
  floor,
  maxFloor,
  totalPrice,
  pricePerMeter,
  initialCurrency,
  vat,
}: CommercialAreaProps) => {
  const { selectedCurrency, rates } = useCurrency();

  if (!totalArea?.maxArea && !totalArea?.minArea && !plotSize) {
    return null;
  }

  const renderTotalArea = () => {
    if (!totalArea?.minArea) {
      return null;
    }

    return (
      <div className={clsx('flex', 'flex-col')}>
        <Typography fontSize={14} fontWeight="medium">
          {totalArea.minArea}
          {totalArea.maxArea && `-${totalArea.maxArea}`}
          <span className={clsx('text-xs', 'opacity-50')}> м²</span>
        </Typography>
        <p className={clsx('text-white', 'text-xs', 'font-light')}>площадь</p>
      </div>
    );
  };

  const renderPlotSize = () => {
    if (totalArea?.minArea || !plotSize) {
      return null;
    }

    return (
      <div className={clsx('flex', 'flex-col')}>
        <Typography fontSize={14} fontWeight="medium">
          {plotSize} <span className={clsx('opacity-50')}>сот.</span>
        </Typography>
        <p className={clsx('text-white', 'text-xs', 'font-light')}>участок</p>
      </div>
    );
  };

  const renderPricePerMeter = () => {
    if (!pricePerMeter?.from || !totalPrice) {
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

  const renderVat = () => {
    if (!vat) {
      return null;
    }

    return (
      <div className={clsx('flex', 'flex-col')}>
        <Typography fontSize={14} fontWeight="medium">
          {vat.replace(/\D/gim, '')}%
        </Typography>{' '}
        <p className={clsx('text-white', 'text-xs', 'font-light')}>НДС</p>
      </div>
    );
  };

  return (
    <div className={clsx('flex', 'items-start', 'justify-start', 'gap-4')}>
      {renderTotalArea()}
      {renderPlotSize()}
      {renderPricePerMeter()}
      {renderVat()}
      <CardFloor floor={floor} maxFloor={maxFloor} />
    </div>
  );
};

export default CommercialArea;
