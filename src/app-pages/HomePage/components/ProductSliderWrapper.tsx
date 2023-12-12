import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React from 'react';

import Title from '@/src/components/common/Title';
import { getActualProductsByType } from '@/src/services/actualProductsServices';
import { ProductType } from '@/src/types/Product';

type ProductSliderWrapperProps = {
  type: ProductType;
};

const getTitleByType = (type: ProductType) => {
  switch (type) {
    case 'flats':
      return 'Актуальные квартиры';
    case 'commercial':
      return 'Актуальная коммерческая недвижимость';
    case 'houses-and-lots':
      return 'Актуальные дома и участки';
  }
};

const ProductSliderWrapper = async ({ type }: ProductSliderWrapperProps) => {
  const title = getTitleByType(type);
  const actualData = await getActualProductsByType(type);

  if (!actualData.length) {
    return null;
  }

  const ProductSlider = dynamic(() => import('@/src/components/Swiper/ProductSlider'));

  return (
    <>
      <Title className={clsx('mb-8')} fontSize={36}>
        {title}
      </Title>
      <ProductSlider products={actualData} type={type} />
    </>
  );
};

export default ProductSliderWrapper;
