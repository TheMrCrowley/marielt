'use client';

import clsx from 'clsx';
import React from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProductCard from '@/components/ProductCard';
import { Product } from '@/services/actualProducts';
import { ProductType } from '@/types/Product';

import styles from './ProductSlider.module.css';

interface ProductSliderProps {
  products: Product[];
  type: ProductType;
}

const ProductSlider = ({ products, type }: ProductSliderProps) => {
  const nextClassName = `next-${type}`;
  const prevClassName = `prev-${type}`;
  return (
    <div className={styles.wrapper}>
      <button className={clsx(styles.button, prevClassName)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="36"
          viewBox="0 0 21 36"
          fill="none"
        >
          <g clipPath="url(#clip0_566_5002)">
            <path
              d="M18.002 2.57153L2.57338 18.0001L18.002 33.4287"
              strokeWidth="2.57143"
              strokeLinecap="square"
            />
          </g>
          <defs>
            <clipPath id="clip0_566_5002">
              <rect
                width="36"
                height="20.5714"
                fill="white"
                transform="translate(20.5723) rotate(90)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
      <Swiper
        wrapperClass={styles.swiperWrapper}
        modules={[Navigation]}
        spaceBetween={25}
        navigation={{
          // TODO change disabled class
          prevEl: `.${prevClassName}`,
          nextEl: `.${nextClassName}`,
        }}
        // grabCursor
        slidesPerView="auto"
      >
        {products.map((product) => (
          <SwiperSlide style={{ width: 330 }} key={Math.random()}>
            <ProductCard product={product} type={type} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={clsx(styles.button, nextClassName)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="36"
          viewBox="0 0 21 36"
          fill="none"
        >
          <g clipPath="url(#clip0_566_5006)">
            <path
              d="M2.57031 2.57153L17.9989 18.0001L2.57031 33.4287"
              strokeWidth="2.57143"
              strokeLinecap="square"
            />
          </g>
          <defs>
            <clipPath id="clip0_566_5006">
              <rect
                width="36"
                height="20.5714"
                fill="white"
                transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 0)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default ProductSlider;
