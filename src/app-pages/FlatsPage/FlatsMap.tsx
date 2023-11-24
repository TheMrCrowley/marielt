import clsx from 'clsx';
import React from 'react';

import ProductMap from '@/src/components/ProductMap';
import { DefaultFlatItem } from '@/src/types/Flats';

interface FlatsMapProps {
  flats: DefaultFlatItem[];
}

const FlatsMap = ({ flats }: FlatsMapProps) => {
  return (
    <section className={clsx('flex', 'w-full', 'md:py-12', 'py-6', 'px-8', 'flex-auto', 'h-full')}>
      <ProductMap items={flats} />;
    </section>
  );
};

export default FlatsMap;
