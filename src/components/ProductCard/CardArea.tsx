import clsx from 'clsx';
import React from 'react';

import Typography from '@/src/components/common/Typography';

interface CardAreaProps {
  totalArea?: string;
  livingArea?: string;
  plotSize?: string;
  priceByMeter?: string;
}

const CardArea = ({ livingArea, plotSize, totalArea, priceByMeter }: CardAreaProps) => {
  if (!totalArea && !livingArea && !plotSize) {
    return null;
  }

  const renderTotalArea = () => {
    if (!totalArea) {
      return null;
    }

    return (
      <div className={clsx('flex', 'flex-col')}>
        <Typography fontSize={14} fontWeight="medium">
          {totalArea}
          <span className={clsx('text-xs', 'opacity-50')}>
            м<sup>2</sup>
          </span>
        </Typography>
        <p className={clsx('text-white', 'text-xs', 'font-light')}>общая</p>
      </div>
    );
  };

  const renderLivingArea = () => {
    if (!livingArea) {
      return null;
    }

    return (
      <div className={clsx('flex', 'flex-col')}>
        <Typography fontSize={14} fontWeight="medium">
          {livingArea}
          <span className={clsx('text-xs', 'opacity-50')}>
            м<sup>2</sup>
          </span>
        </Typography>
        <p className={clsx('text-white', 'text-xs', 'font-light')}>жилая</p>
      </div>
    );
  };

  const renderPriceByMeter = () => {
    if (!priceByMeter) {
      return null;
    }

    return (
      <div className={clsx('flex', 'flex-col')}>
        <Typography fontSize={14} fontWeight="medium">
          {priceByMeter}
        </Typography>
        <p className={clsx('text-white', 'text-xs', 'font-light')}>
          за м<sup>2</sup>
        </p>
      </div>
    );
  };

  const renderPlotSize = () => {
    if (!plotSize) {
      return null;
    }

    return (
      <Typography fontSize={14} fontWeight="light" className="flex gap-x-1">
        Площадь участка:{' '}
        <Typography fontSize={14} fontWeight="medium">
          {plotSize}
        </Typography>{' '}
        <span className={clsx('opacity-50')}>соток</span>
      </Typography>
    );
  };

  return (
    <>
      <div className={clsx('flex', 'items-center', 'justify-between')}>
        {renderTotalArea()}
        {renderLivingArea()}
        {renderPriceByMeter()}
      </div>
      {renderPlotSize()}
    </>
  );
};

export default CardArea;
