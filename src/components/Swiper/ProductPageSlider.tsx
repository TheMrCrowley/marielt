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

import FullScreenSlider from './FullScreenSlider';
import FullScreenSliderWrapper from './FullScreenSliderWrapper';
import SliderButton from './SliderButton';

const ProductPageSlider = ({
  images,
  type,
}: {
  images: Array<{ url: string; width: number; height: number; placeholderUrl: string }>;
  type: ProductType;
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [currentRealIndex, setCurrentRealIndex] = useState<number>(0);
  const breakpoint = useWindowSize();

  const nextClassName = `next-${type}-main-slider-button`;
  const prevClassName = `prev-${type}-main-slider-button`;

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
        onClick={() => setIsFullScreen(true)}
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
        <SliderButton buttonType="prev" sliderClassName={prevClassName} className="bg-opacity-10" />
        <SliderButton buttonType="next" sliderClassName={nextClassName} className="bg-opacity-10" />
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
      <FullScreenSliderWrapper isOpen={isFullScreen}>
        <FullScreenSlider
          closeModal={() => setIsFullScreen(false)}
          images={images}
          initialSlide={currentRealIndex}
          type={type}
        />
      </FullScreenSliderWrapper>
    </>
  );
};

export default ProductPageSlider;
