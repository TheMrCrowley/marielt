import React from 'react';

import SectionPreview from '@/src/components/SectionPreview/SectionPreview';
import { getProductTypeByRoute } from '@/src/helpers/getProductTypeByRoute';
import { HomePageItem } from '@/src/types/HomePage';

import ProductSliderWrapper from './ProductSliderWrapper';

interface ProductPreviewProps {
  data: HomePageItem;
}

const ProductPreview = ({ data }: ProductPreviewProps) => {
  const productType = getProductTypeByRoute(data.to);

  return (
    <SectionPreview sectionData={data}>
      <ProductSliderWrapper type={productType} />
    </SectionPreview>
  );
};

export default ProductPreview;
