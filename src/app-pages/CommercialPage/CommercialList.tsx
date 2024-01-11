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
    <ProductListWrapper pagination={pagination}>
      {!!commercial.length &&
        commercial.map((item) => (
          <CommercialCard commercialItem={item} key={`flats-list-flats-item-${item.id}`} />
        ))}
    </ProductListWrapper>
  );
};

export default CommercialList;
