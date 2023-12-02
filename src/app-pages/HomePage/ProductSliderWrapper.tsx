import clsx from 'clsx';
import React from 'react';

import ProductSlider from '@/src/components/Swiper/ProductSlider';
import Title from '@/src/components/common/Title';
import { getActualProductsByType } from '@/src/services/actualProductsServices';
import { ProductType } from '@/src/types/Product';

interface ProductSliderWrapperProps {
  type: ProductType;
}

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
