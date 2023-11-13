import clsx from 'clsx';
import React, { FC } from 'react';

import Title from '@/src/components/common/Title/Title';
import Typography from '@/src/components/common/Typography/Typography';

interface CharacteristicItem {
  key: string;
  value: string;
}
interface CharacteristicsProps {
  characteristics: CharacteristicItem[];
}

const Characteristics: FC<CharacteristicsProps> = ({ characteristics }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'lg:w-[35%]', 'w-full')}>
      {/*TODO //padding, bg value to taiwind? */}

      <Title fontSize={32} className={clsx('bg-[#262626]', 'py-6', 'pl-8')}>
        Характеристики
      </Title>
      {characteristics.map(({ key, value }, i) => (
        <div
          key={i}
          className={clsx(
            'flex',
            'justify-between',
            'py-[13px]',
            'pl-8',
            'pr-5',
            i % 2 ? 'bg-[#262626]' : 'bg-primary',
          )}
        >
          <Typography fontWeight="light">{key}</Typography>
          <Typography fontWeight="light">{value}</Typography>
        </div>
      ))}
    </div>
  );
};

export default Characteristics;
