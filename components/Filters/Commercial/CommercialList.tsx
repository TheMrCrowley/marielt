import React from 'react';

import ProductListWrapper from '@/components/Filters/ProductListWrapper';
import CommercialCard from '@/components/ProductCard/CommercialCard';
import { DefaultCommercialItem } from '@/services/commercial';
import { StrapiFindResponse } from '@/types/StrapiFindResponse';

interface CommercialListProps {
  commercial: DefaultCommercialItem[];
  pagination: StrapiFindResponse<{}>['meta']['pagination'];
}

const CommercialList = ({ commercial, pagination }: CommercialListProps) => {
  return (
    <ProductListWrapper pagination={pagination}>
      {commercial.map((item) => (
        <CommercialCard commercialItem={item} key={`flats-list-flats-item-${item.id}`} />
      ))}
    </ProductListWrapper>
  );
};

export default CommercialList;
