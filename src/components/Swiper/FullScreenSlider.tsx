import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import 'swiper/css/zoom';
import { Navigation, Keyboard, Thumbs, Zoom } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import CrossIcon from '@/public/plus.svg';
import WithDisabledScroll from '@/src/components/common/WithDisabledScroll';
import { WindowWidth } from '@/src/enums/Width';
import { getVideoId } from '@/src/helpers/videoHelpers';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { ProductType } from '@/src/types/Product';
import { StrapiVideo } from '@/src/types/VideoLink';

import SliderButton from './SliderButton';

interface FullScreenSliderProps {
  closeModal: () => void;
  images: Array<{
    width: number;
    height: number;
    url: string;
    placeholderUrl: string;
    thumb: { url: string; width: number; height: number; placeholderUrl: string };
  }>;
  type: ProductType;
  initialSlide: number;
  video?: StrapiVideo;
}

const FullScreenSlider = ({
  closeModal,
  images,
  initialSlide,
  type,
  video,
}: FullScreenSliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [currentRealIndex, setCurrentRealIndex] = useState<number>(0);
  const breakpoint = useWindowSize();

  const nextClassName = `next-${type}-main-slider-button-full-screen`;
  const prevClassName = `prev-${type}-main-slider-button-full-screen`;

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
    <WithDisabledScroll>
      <div
        className={clsx(
          'fixed',
          'top-0',
          'left-0',
          'right-0',
          'bottom-0',
          'box-border',
          'z-50',
          'flex',
          'justify-center',
          'items-center',
          'bg-[#000000bf]',
          'backdrop-blur-sm',
        )}
        role="dialog"
      >
        <div
          className={clsx(
            'w-full',
            'relative',
            'z-50',
            'flex',
            'flex-col',
            'min-w-0',
            'flex-auto',
            'h-full',
            'justify-center',
          )}
        >
          <Swiper
            onSlideChange={(swiper) => {
              setCurrentRealIndex(swiper.realIndex);
            }}
            zoom={{
              maxRatio: 3,
              minRatio: 1,
            }}
            initialSlide={initialSlide}
            wrapperClass={clsx('w-full', 'relative', 'mb-8')}
            slidesPerView={1}
            modules={[Navigation, Keyboard, Thumbs, Zoom]}
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
          >
            {video && (
              <SwiperSlide
                className={clsx('!w-full')}
                style={{
                  height: '70vh',
                }}
              >
                <div
                  className={clsx('h-full', 'sm:w-4/5', 'w-full', 'my-0', 'mx-auto')}
                  dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.youtube.com/embed/${getVideoId(
                      video.url,
                    )}?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="${
                      video.title
                    }" class="w-full h-full"></iframe>`,
                  }}
                />
              </SwiperSlide>
            )}
            {images.map(({ url, height, width, placeholderUrl }) => (
              <SwiperSlide
                className={clsx('!w-full', 'swiper-zoom-container')}
                style={{
                  height: '70vh',
                }}
                zoom
                key={`full-screen-product-page-swiper-slide-${url}`}
              >
                <Image
                  src={url}
                  alt=""
                  width={width}
                  height={height}
                  className={clsx('object-contain', 'w-full', 'h-full')}
                  placeholder="blur"
                  blurDataURL={placeholderUrl}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={getThumbSlidesPerView()}
            modules={[Thumbs]}
            className="md:!w-3/4 !w-full cursor-pointer"
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
                  height: '15vh',
                }}
              >
                <Image
                  src={video.thumbnail}
                  alt=""
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
                  height: '15vh',
                }}
                key={`full-screen-product-page-thumb-swiper-slide-${url}`}
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
                    'border-2',
                    'p-1',
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
        </div>
        <button
          className={clsx(
            'flex',
            'justify-center',
            'items-center',
            'absolute',
            'md:top-6',
            'md:right-36',
            'top-8',
            'right-5',
            'hover:cursor-pointer',
            'z-50',
          )}
          onClick={closeModal}
        >
          <Image
            src={CrossIcon}
            alt="close-icon"
            className={clsx('md:w-8', 'md:h-8', 'w-4', 'h-4')}
          />
        </button>
        <SliderButton
          buttonType="prev"
          sliderClassName={prevClassName}
          className="bg-opacity-0 xl:flex hidden"
        />
        <SliderButton
          buttonType="next"
          sliderClassName={nextClassName}
          className="bg-opacity-0 xl:flex hidden"
        />
      </div>
    </WithDisabledScroll>
  );
};

export default FullScreenSlider;
