import { StaticImageData } from 'next/image';
import React from 'react';

import CategoryPreview from '@/components/CategoryPreview';
import Title from '@/components/Title';
import ApartmentsImg from '@/public/apartments.png';
import CommercialImg from '@/public/commercial.png';
import HouseImg from '@/public/house.png';
import { ProductType } from '@/types/Product.type';

import styles from './ActualPreview.module.css';

interface ActualPreviewProps {
  type: ProductType;
}

const getCategoryDataByType = (
  type: ProductType,
): {
  title: string;
  description: string;
  variant: 'primary' | 'secondary';
  image: StaticImageData;
} => {
  switch (type) {
    case 'apartments':
      return {
        description:
          'Lorem ipsum dolor sit amet consectetur. In egestas nec enim odio. Sed ultricies id dis maecenas. Tincidunt lectus faucibus ullamcorper vel. Sit ullamcorper nunc at viverra odio nisl ut. Est auctor rhoncus facilisis orci.',
        title: 'Квартиры',
        variant: 'primary',
        image: ApartmentsImg,
      };
    case 'house':
      return {
        description:
          'Lorem ipsum dolor sit amet consectetur. In egestas nec enim odio. Sed ultricies id dis maecenas. Tincidunt lectus faucibus ullamcorper vel. Sit ullamcorper nunc at viverra odio nisl ut. Est auctor rhoncus facilisis orci.',
        title: 'Дома и участки',
        variant: 'secondary',
        image: HouseImg,
      };
    case 'commercial':
      return {
        description:
          'Lorem ipsum dolor sit amet consectetur. In egestas nec enim odio. Sed ultricies id dis maecenas. Tincidunt lectus faucibus ullamcorper vel. Sit ullamcorper nunc at viverra odio nisl ut. Est auctor rhoncus facilisis orci.',
        title: 'Коммерческая недвижимость',
        variant: 'primary',
        image: CommercialImg,
      };
  }
};

const ActualPreview = ({ type }: ActualPreviewProps) => {
  const data = getCategoryDataByType(type);

  return (
    <section className={styles.wrapper}>
      <CategoryPreview {...data} />
    </section>
  );
};

export default ActualPreview;
