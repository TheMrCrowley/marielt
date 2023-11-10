'use client';

import clsx from 'clsx';
import React from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProductCard from '@/components/ProductCard';
import { WindowWidth } from '@/enums/Width';
import { useWindowSize } from '@/helpers/useWindowSize';
import { Product } from '@/services/actualProducts';
import { ProductType } from '@/types/Product';

import styles from './ProductSlider.module.css';

interface ProductSliderProps {
  products: Product[];
  type: ProductType;
}

const ProductSlider = ({ products, type }: ProductSliderProps) => {
  const breakpoint = useWindowSize();

  const nextClassName = `next-${type}`;
  const prevClassName = `prev-${type}`;

  const isHidden = !(breakpoint >= WindowWidth.MD) || products.length <= 4;

  const renderButton = (buttonType: 'next' | 'prev') => {
    if (isHidden) {
      return null;
    }

    return (
      <button
        className={clsx(styles.button, buttonType === 'prev' ? prevClassName : nextClassName)}
      >
        {buttonType === 'prev' ? (
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
        ) : (
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
        )}
      </button>
    );
  };

  return (
    <div className={clsx('relative', 'flex', 'md:p-0', 'px-4')}>
      {renderButton('prev')}
      <Swiper
        wrapperClass={styles.swiperWrapper}
        modules={[Navigation]}
        spaceBetween={25}
        navigation={{
          prevEl: `.${prevClassName}`,
          nextEl: `.${nextClassName}`,
          disabledClass: 'opacity-0 pointer-events-none shrink-0 grow-0 basis-1/12',
        }}
        slidesPerView="auto"
      >
        {products.map((product, index) => (
          <SwiperSlide style={{ width: 330 }} key={`product-slider-${type}-swiper-slide-${index}`}>
            <ProductCard product={product} type={type} />
          </SwiperSlide>
        ))}
      </Swiper>
      {renderButton('next')}
    </div>
  );
};

export default ProductSlider;
