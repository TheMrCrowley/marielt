import clsx from 'clsx';
import React, { FC } from 'react';

import Title from '@/src/components/common/Title/Title';
import Typography from '@/src/components/common/Typography/Typography';

interface CharacteristicItem {
  name: string;
  value: string;
}
interface CharacteristicsProps {
  characteristics: CharacteristicItem[];
}

const Characteristics: FC<CharacteristicsProps> = ({ characteristics }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'xl:w-[35%]', 'w-full')}>
      <Title fontSize={32} className={clsx('bg-[#262626]', 'py-6', 'px-5')}>
        Характеристики
      </Title>
      {characteristics.map(({ name, value }, i) => (
        <div
          key={`product-item-characteristic-item-${name}-${value}-${i}`}
          className={clsx(
            'flex',
            'justify-between',
            'py-3',
            'px-5',
            'gap-4',
            i % 2 ? 'bg-[#262626]' : 'bg-primary',
          )}
        >
          <Typography fontWeight="light" className="capitalize">
            {name}
          </Typography>
          <Typography fontWeight="light" className="capitalize">
            {value}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default Characteristics;
