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
          {totalArea} <span className={clsx('text-xs', 'opacity-50')}> м²</span>
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
          {livingArea} <span className={clsx('text-xs', 'opacity-50')}> м²</span>
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
        </Typography>{' '}
        <p className={clsx('text-white', 'text-xs', 'font-light')}>за м²</p>
      </div>
    );
  };

  const renderPlotSize = () => {
    if (!plotSize) {
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

  return (
    <>
      <div className={clsx('flex', 'items-center', 'justify-start', 'gap-4')}>
        {renderTotalArea()}
        {renderLivingArea()}
        {renderPriceByMeter()}
        {renderPlotSize()}
      </div>
    </>
  );
};

export default CardArea;
