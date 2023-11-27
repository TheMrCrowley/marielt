import clsx from 'clsx';
import React from 'react';

import ProductMap from '@/src/components/ProductMap';
import { DefaultMapFlatItem } from '@/src/types/Flats';

interface FlatsMapProps {
  flats: DefaultMapFlatItem[];
}

const FlatsMap = ({ flats }: FlatsMapProps) => {
  return (
    <section className={clsx('flex', 'w-full', 'flex-auto', 'items-stretch', 'h-full')}>
      <ProductMap items={flats} />
    </section>
  );
};

export default FlatsMap;
