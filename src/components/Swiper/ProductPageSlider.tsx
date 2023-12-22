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
import { StrapiVideo } from '@/src/types/VideoLink';

import FullScreenSlider from './FullScreenSlider';
import FullScreenSliderWrapper from './FullScreenSliderWrapper';
import SliderButton from './SliderButton';

const ProductPageSlider = ({
  images,
  type,
  video,
}: {
  video?: StrapiVideo;
  images: Array<{
    width: number;
    height: number;
    url: string;
    placeholderUrl: string;
    thumb: { url: string; width: number; height: number; placeholderUrl: string };
  }>;
  type: ProductType;
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [currentRealIndex, setCurrentRealIndex] = useState<number>(1);
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
        wrapperClass={clsx('w-full', 'relative', '!m-0')}
        className="md:!my-4 !my-2 !m-0 w-full"
        slidesPerView="auto"
        modules={[Navigation, Keyboard, Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        navigation={{
          prevEl: `.${prevClassName}`,
          nextEl: `.${nextClassName}`,
          disabledClass: '!hidden',
        }}
        centeredSlides
        grabCursor
        keyboard
        onClick={() => setIsFullScreen(true)}
        initialSlide={currentRealIndex}
      >
        {video && (
          <SwiperSlide
            className={clsx(
              'lg:!w-1/3',
              'md:!w-2/3',
              '!w-4/5',
              'relative',
              'after',
              'after:z-50',
              'after:block',
              'after:absolute',
              'after:top-1/2',
              'after:left-1/2',
              'after:-translate-x-1/2',
              'after:-translate-y-1/2',
              'after:w-16',
              'after:h-16',
              'after:bg-[url(/play-icon.svg)]',
              'after:bg-no-repeat',
              'after:bg-contain',
              'after:bg-center',
            )}
            style={{
              height: getSlideHeight(),
            }}
            lazy
            onLoad={() => {}}
          >
            {({ isActive }) => {
              return (
                <Image
                  src={video.thumbnail}
                  alt=""
                  width={video.rawData.thumbnail_width}
                  height={video.rawData.thumbnail_height}
                  loading="lazy"
                  className={clsx(
                    'relative',
                    'object-cover',
                    'w-full',
                    'h-full',
                    'transition-all',
                    'border-solid',
                    isActive ? 'sm:border-y-8' : 'sm:border-y-4',
                    isActive ? 'border-y-4' : 'border-y-2',
                    isActive ? 'border-secondary' : 'border-white',
                    isActive ? 'opacity-100' : 'opacity-50',
                  )}
                />
              );
            }}
          </SwiperSlide>
        )}
        {images.map(({ url, height, width, placeholderUrl }) => (
          <SwiperSlide
            className={clsx('lg:!w-1/3', 'md:!w-2/3', '!w-4/5')}
            style={{
              height: getSlideHeight(),
            }}
            key={`product-page-swiper-slide-${url}`}
            lazy
            onLoad={() => {}}
          >
            {({ isActive }) => {
              return (
                <Image
                  src={url}
                  alt="product-page-slide"
                  width={width}
                  height={height}
                  loading="lazy"
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
        initialSlide={currentRealIndex}
        className="md:!w-3/4 !w-full sm:mb-10 mb-6 cursor-pointer"
        watchSlidesProgress
      >
        {video && (
          <SwiperSlide
            className={clsx(
              'lg:!w-1/6',
              'md:!w-1/5',
              '!w-1/4',
              'relative',
              'after',
              'after:z-50',
              'after:block',
              'after:absolute',
              'after:top-1/2',
              'after:left-1/2',
              'after:-translate-x-1/2',
              'after:-translate-y-1/2',
              'md:after:w-16',
              'md:after:h-16',
              'after:w-h-10',
              'after:h-10',
              'after:bg-[url(/play-icon.svg)]',
              'after:bg-no-repeat',
              'after:bg-contain',
              'after:bg-center',
            )}
            style={{
              height: getThumbSlideHeight(),
            }}
            lazy
            onLoad={() => {}}
          >
            <Image
              src={video.thumbnail}
              alt=""
              loading="lazy"
              width={video.rawData.thumbnail_width}
              height={video.rawData.thumbnail_height}
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
                currentRealIndex === 0 ? 'border-secondary' : 'border-transparent',
              )}
            />
          </SwiperSlide>
        )}
        {images.map(({ thumb: { height, placeholderUrl, url, width } }, i) => (
          <SwiperSlide
            style={{
              height: getThumbSlideHeight(),
            }}
            key={`product-page-thumb-swiper-slide-${url}`}
            lazy
            onLoad={() => {}}
          >
            <Image
              src={url}
              alt=""
              loading="lazy"
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
                (video ? i + 1 === currentRealIndex : i === currentRealIndex)
                  ? 'border-secondary'
                  : 'border-transparent',
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
          video={video}
        />
      </FullScreenSliderWrapper>
    </>
  );
};

export default ProductPageSlider;
