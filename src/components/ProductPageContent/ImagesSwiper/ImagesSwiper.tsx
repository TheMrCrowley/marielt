'use client';

import clsx from 'clsx';
import Image from 'next/image';
import 'swiper/css';
import { Navigation, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductType } from '@/src/types/Product';

const ImagesSwiper = ({
  images,
  type,
}: {
  images: Array<{ url: string; width: number; height: number; placeholderUrl: string }>;
  type: ProductType;
}) => {
  const nextClassName = `next-${type}`;
  const prevClassName = `prev-${type}`;

  const renderButton = (buttonType: 'next' | 'prev') => {
    return (
      <button
        className={clsx(
          buttonType === 'prev' ? prevClassName : nextClassName,
          'absolute',
          'w-20',
          'h-full',
          'z-50',
          buttonType === 'prev' ? 'left-0' : 'right-0',
          'top-0',
          'flex',
          'justify-center',
          'items-center',
          'stroke-secondary',
          'transition-all',
          'hover:cursor-pointer',
          'bg-white',
          'bg-opacity-10',
          'hover:bg-opacity-25',
          'active:scale-95',
        )}
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
    <Swiper
      slidesPerView="auto"
      centeredSlides
      wrapperClass={clsx('w-full', '!items-center', 'relative')}
      loop
      grabCursor
      modules={[Navigation, Keyboard]}
      navigation={{
        prevEl: `.${prevClassName}`,
        nextEl: `.${nextClassName}`,
      }}
      keyboard
    >
      {images.map(({ url, height, width, placeholderUrl }) => (
        <SwiperSlide
          className={clsx('!w-1/3')}
          style={{
            height: 500,
          }}
          key={`product-page-swiper-slide-${url}`}
        >
          {({ isActive }) => {
            return (
              <Image
                src={url}
                alt=""
                width={width}
                height={height}
                className={clsx(
                  'object-contain',
                  'w-full',
                  'h-full',
                  'transition-all',
                  'border-solid',
                  isActive ? 'border-y-8' : 'border-y-4',
                  isActive ? 'border-secondary' : 'border-white',
                  isActive ? 'opacity-100' : 'opacity-50',
                )}
                style={{
                  backgroundImage: `url(${placeholderUrl})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
                placeholder="blur"
                blurDataURL={placeholderUrl}
              />
            );
          }}
        </SwiperSlide>
      ))}
      {renderButton('prev')}
      {renderButton('next')}
    </Swiper>
  );
};

export default ImagesSwiper;
