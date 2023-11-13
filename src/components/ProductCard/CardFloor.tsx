import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import FloorIcon from '@/public/card-floor.svg';
import Typography from '@/src/components/common/Typography';

interface CardFloorProps {
  floor?: string;
  maxFloor?: string;
}

const CardFloor = ({ floor, maxFloor }: CardFloorProps) => {
  if (!floor) {
    return null;
  }

  return (
    <div className={clsx('flex', 'items-center', 'gap-2')}>
      <Image src={FloorIcon} alt="floor" />
      <Typography fontSize={16}>
        {floor}
        <span className={clsx('text-white', 'text-base', 'font-normal', 'opacity-50')}>
          /{maxFloor}
        </span>
      </Typography>
    </div>
  );
};

export default CardFloor;
