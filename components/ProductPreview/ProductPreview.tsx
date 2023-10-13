import clsx from 'clsx';
import React from 'react';

import ActualProductSlider from '@/components/ActualProductSlider';
import CategoryPreview from '@/components/CategoryPreview';
import { getProductTypeByRoute } from '@/helpers/getProductTypeByRoute';
import { HomePageItem } from '@/types/HomePage';

interface ProductPreviewProps {
  data: HomePageItem;
}

const ProductPreview = ({ data }: ProductPreviewProps) => {
  const type = getProductTypeByRoute(data.to);

  return (
    <section className={clsx('flex', 'flex-col', 'gap-y-12', 'mb-[150px]')}>
      <CategoryPreview {...data} />
      <ActualProductSlider type={type} />
    </section>
  );
};

export default ProductPreview;
