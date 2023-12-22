'use client';

import clsx from 'clsx';
import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import CommercialCard from '@/src/components/ProductCard/CommercialCard';
import FlatCard from '@/src/components/ProductCard/FlatCard';
import HousesAndLotsCard from '@/src/components/ProductCard/HousesAndLotsCard';
import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { DefaultCommercialItem } from '@/src/types/Commercial';
import { DefaultFlatItem } from '@/src/types/Flats';
import { DefaultHousesAndLotsItem } from '@/src/types/HousesAndLots';
import { ProductType } from '@/src/types/Product';

import styles from './ProductSlider.module.css';

interface ProductSliderProps {
  products: DefaultFlatItem[] | DefaultCommercialItem[] | DefaultHousesAndLotsItem[];
  type: ProductType;
}

const ProductSlider = ({ products, type }: ProductSliderProps) => {
  const breakpoint = useWindowSize();

  const renderSlides = () => {
    const slideWidth = breakpoint >= WindowWidth.MD ? 330 : 300;
    switch (type) {
      case 'flats':
        return products.map((product, index) => (
          <SwiperSlide
            style={{ width: slideWidth }}
            key={`product-slider-${type}-swiper-slide-${index}`}
          >
            <FlatCard flatItem={product as DefaultFlatItem} />
          </SwiperSlide>
        ));
      case 'commercial':
        return products.map((product, index) => (
          <SwiperSlide
            style={{ width: slideWidth }}
            key={`product-slider-${type}-swiper-slide-${index}`}
          >
            <CommercialCard commercialItem={product as DefaultCommercialItem} />
          </SwiperSlide>
        ));
      case 'houses-and-lots':
        return products.map((product, index) => (
          <SwiperSlide
            style={{ width: slideWidth }}
            key={`product-slider-${type}-swiper-slide-${index}`}
          >
            <HousesAndLotsCard housesAndLotsItem={product as DefaultHousesAndLotsItem} />
          </SwiperSlide>
        ));
    }
  };

  return (
    <div className={clsx('flex', 'p-0', 'relative')}>
      <Swiper
        wrapperClass={clsx(styles.swiperWrapper)}
        className="!m-0"
        spaceBetween={25}
        slidesPerView="auto"
      >
        {renderSlides()}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
