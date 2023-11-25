import clsx from 'clsx';
import React from 'react';

import ProductMap from '@/src/components/ProductMap';
import { DefaultMapFlatItem } from '@/src/types/Flats';

interface FlatsMapProps {
  flats: DefaultMapFlatItem[];
}

const FlatsMap = ({ flats }: FlatsMapProps) => {
  return (
    <section
      className={clsx('flex', 'w-full', 'py-6', 'px-8', 'flex-auto', 'h-full', 'items-stretch')}
    >
      <ProductMap items={flats} />
    </section>
  );
};

export default FlatsMap;
