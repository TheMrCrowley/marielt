import clsx from 'clsx';
import React from 'react';

import Typography from '@/src/components/common/Typography';

import CardFloor from './CardFloor';

interface CommercialAreaProps {
  totalArea: {
    minArea?: string;
    maxArea?: string;
  };
  plotSize?: string;
  floor?: string;
  maxFloor?: string;
}

const CommercialArea = ({
  totalArea: { maxArea, minArea },
  plotSize,
  floor,
  maxFloor,
}: CommercialAreaProps) => {
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
          <span className={clsx('text-xs', 'opacity-50')}>
            м<sup>2</sup>
          </span>
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
        <span className={clsx('opacity-50')}>соток</span>
      </Typography>
    );
  };

  return (
    <div className={clsx('flex', 'items-center', 'justify-between')}>
      {renderTotalArea()}
      {renderPlotSize()}
      <CardFloor floor={floor} maxFloor={maxFloor} />
    </div>
  );
};

export default CommercialArea;
