import clsx from 'clsx';
import React from 'react';

import CommercialCard from '@/src/components/ProductCard/CommercialCard';
import ProductListWrapper from '@/src/components/filters/ProductListWrapper';
import { DefaultCommercialItem } from '@/src/types/Commercial';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

interface CommercialListProps {
  commercial: DefaultCommercialItem[];
  pagination: StrapiFindResponse<{}>['meta']['pagination'];
}

const CommercialList = ({ commercial, pagination }: CommercialListProps) => {
  return (
    <section
      className={clsx(
        'w-full',
        'md:py-12',
        'md:px-20',
        'py-6',
        'px-6',
        'gap-8',
        'flex',
        'items-stretch',
      )}
    >
      <ProductListWrapper pagination={pagination}>
        {commercial.map((item) => (
          <CommercialCard commercialItem={item} key={`flats-list-flats-item-${item.id}`} />
        ))}
      </ProductListWrapper>
    </section>
  );
};

export default CommercialList;
