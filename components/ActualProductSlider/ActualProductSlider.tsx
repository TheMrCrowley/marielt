import React from 'react';

import Title from '@/components/Title';
import { getActualProductByType } from '@/services/actualProducts';
import { ProductType } from '@/types/Product.type';

import styles from './ActualProductSlider.module.css';

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
  const data = await getActualProductByType[type]();

  return (
    <div>
      <Title className={styles.title} fontSize={36}>
        {title}
      </Title>
    </div>
  );
};

export default ActualProductSlider;
