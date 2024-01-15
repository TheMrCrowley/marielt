import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import Title from '@/src/components/common/Title/Title';
import Typography from '@/src/components/common/Typography/Typography';

interface CharacteristicItem {
  name: string;
  value: string;
  order: number;
}

type CharacteristicsProps = {
  characteristics: CharacteristicItem[];
};

const Characteristics = ({
  characteristics,
  children,
}: PropsWithChildren<CharacteristicsProps>) => {
  if (!characteristics.length) {
    return null;
  }

  const sortedCharacteristics = characteristics.sort((a, b) => a.order - b.order);

  return (
    <div className={clsx('flex', 'flex-col', 'xl:w-[35%]', 'w-full', 'min-w-fit')}>
      <Title fontSize={32} className={clsx('bg-primary-bold', 'py-6', 'px-5')}>
        Характеристики
      </Title>
      {sortedCharacteristics.map(({ name, value }, i) => (
        <div
          key={`product-item-characteristic-item-${name}-${value}-${i}`}
          className={clsx(
            'grid',
            'grid-flow-col',
            'grid-rows-1',
            'justify-between',
            'py-2',
            'px-4',
            'gap-4',
            i % 2 ? 'bg-primary-bold' : 'bg-primary',
          )}
        >
          <Typography fontWeight="light" className="first-letter:uppercase">
            {name}
          </Typography>
          <Typography
            fontWeight="light"
            fontSize={16}
            className="place-self-end max-w-max w-full text-left"
          >
            {value}
          </Typography>
        </div>
      ))}
      {children}
    </div>
  );
};

export default Characteristics;
