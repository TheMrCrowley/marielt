'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import 'swiper/css';
import { Navigation, Keyboard, Thumbs } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { ProductType } from '@/src/types/Product';

const ImagesSwiper = ({
  images,
  type,
}: {
  images: Array<{ url: string; width: number; height: number; placeholderUrl: string }>;
  type: ProductType;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [currentRealIndex, setCurrentRealIndex] = useState<number>(0);
  const breakpoint = useWindowSize();

  const nextClassName = `next-${type}`;
  const prevClassName = `prev-${type}`;

  const renderButton = (buttonType: 'next' | 'prev') => {
    return (
      <button
        className={clsx(
          buttonType === 'prev' ? prevClassName : nextClassName,
          'absolute',
          'md:w-20',
          'w-12',
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

  const getSlideHeight = () => {
    if (breakpoint >= WindowWidth.ExtraXL) {
      return 535;
    }

    if (breakpoint >= WindowWidth.LG) {
      return 400;
    }

    if (breakpoint >= WindowWidth.MD) {
      return 350;
    }

    if (breakpoint >= WindowWidth.SM) {
      return 250;
    }

    return 200;
  };

  const getThumbSlideHeight = () => {
    if (breakpoint >= WindowWidth.ExtraXL) {
      return 125;
    }

    if (breakpoint >= WindowWidth.SM) {
      return 100;
    }

    return 75;
  };

  const getThumbSlidesPerView = () => {
    if (breakpoint >= WindowWidth.ExtraXL) {
      return 6;
    }

    if (breakpoint >= WindowWidth.SM) {
      return 5;
    }

    return 4;
  };

  return (
    <>
      <Swiper
        onSlideChange={(swiper) => {
          setCurrentRealIndex(swiper.realIndex);
        }}
        wrapperClass={clsx('w-full', 'relative')}
        className="md:mb-4 mb-2"
        slidesPerView="auto"
        modules={[Navigation, Keyboard, Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        navigation={{
          prevEl: `.${prevClassName}`,
          nextEl: `.${nextClassName}`,
        }}
        centeredSlides
        grabCursor
        loop
        keyboard
      >
        {images.map(({ url, height, width, placeholderUrl }) => (
          <SwiperSlide
            className={clsx('lg:!w-1/3', 'md:!w-2/3', '!w-4/5')}
            style={{
              height: getSlideHeight(),
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
                    isActive ? 'sm:border-y-8' : 'sm:border-y-4',
                    isActive ? 'border-y-4' : 'border-y-2',
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
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={getThumbSlidesPerView()}
        modules={[Thumbs]}
        className="md:!w-3/4 !w-full sm:mb-10 mb-6 cursor-pointer"
        watchSlidesProgress
      >
        {images.map(({ url, height, width, placeholderUrl }, i) => (
          <SwiperSlide
            style={{
              height: getThumbSlideHeight(),
            }}
            key={`product-page-thumb-swiper-slide-${url}`}
          >
            <Image
              src={url}
              alt=""
              width={width}
              height={height}
              className={clsx(
                'object-cover',
                'w-full',
                'h-full',
                'transition-all',
                'border-solid',
                'sm:border-4',
                'border-2',
                'sm:p-1',
                'p-0',
                i === currentRealIndex ? 'border-secondary' : 'border-transparent',
              )}
              placeholder="blur"
              blurDataURL={placeholderUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImagesSwiper;
