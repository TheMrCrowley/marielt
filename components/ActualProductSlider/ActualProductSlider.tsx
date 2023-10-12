import React from 'react';

import Title from '@/components/Title';
import { getActualProductByType } from '@/services/actualProducts';
import { ProductType } from '@/types/Product.type';

import styles from './ActualProductSlider.module.css';
import ProductSlider from './ProductSlider';

interface ActualProductSliderProps {
  type: ProductType;
}

const getTitleByType = (type: ProductType) => {
  switch (type) {
    case 'apartments':
      return 'Актуальные квартиры';
    case 'commercial':
      return 'Актуальная коммерческая недвижемость';
    case 'house':
      return 'Актуальные дома и квартиры';
  }
};

const ActualProductSlider = async ({ type }: ActualProductSliderProps) => {
  const title = getTitleByType(type);
  const data = await getActualProductByType(type);

  if (!data.length) {
    return null;
  }

  return (
    <div>
      <Title className={styles.title} fontSize={36}>
        {title}
      </Title>
      <ProductSlider
        products={[
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
        ]}
      />
    </div>
  );
};

export default ActualProductSlider;
