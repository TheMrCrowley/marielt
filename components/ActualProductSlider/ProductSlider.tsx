'use client';

import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProductCard from '@/components/ProductCard';
import { Product } from '@/services/actualProducts';

interface ProductSliderProps {
  products: Product[];
}

export const ProductSlider = ({ products }: ProductSliderProps) => {
  return (
    <Swiper spaceBetween={25} grabCursor slidesPerView="auto">
      {products.map((product) => (
        <SwiperSlide style={{ width: 330 }} key={Math.random()}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
