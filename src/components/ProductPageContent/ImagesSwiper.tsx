'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import 'swiper/css';
import { Navigation, Keyboard, Thumbs } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import CrossIcon from '@/public/plus.svg';
import WithDisabledScroll from '@/src/components/common/WithDisabledScroll';
import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { ProductType } from '@/src/types/Product';

const SliderButton = ({
  buttonType,
  sliderClassName,
  className,
}: {
  buttonType: 'next' | 'prev';
  sliderClassName: string;
  className: string;
}) => {
  const renderButton = () => {
    return (
      <button
        className={clsx(
          sliderClassName,
          buttonType === 'prev' ? 'left-0' : 'right-0',
          'absolute',
          'md:w-20',
          'w-12',
          'h-full',
          'z-50',
          'top-0',
          'flex',
          'justify-center',
          'items-center',
          'stroke-secondary',
          'transition-all',
          'hover:cursor-pointer',
          'bg-white',
          'hover:bg-opacity-25',
          className,
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

  return renderButton();
};

const FullScreenSwiper = ({
  isOpen,
  closeModal,
  images,
  type,
  initialSlide,
}: {
  isOpen: boolean;
  closeModal: () => void;
  images: Array<{ url: string; width: number; height: number; placeholderUrl: string }>;
  type: ProductType;
  initialSlide: number;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [currentRealIndex, setCurrentRealIndex] = useState<number>(0);
  const breakpoint = useWindowSize();

  const nextClassName = `next-${type}-main-slider-button-full-screen`;
  const prevClassName = `prev-${type}-main-slider-button-full-screen`;

  if (!isOpen) {
    return null;
  }

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
            initialSlide={initialSlide}
            wrapperClass={clsx('w-full', 'relative', 'mb-8')}
            slidesPerView={1}
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
            keyboard
          >
            {images.map(({ url, height, width, placeholderUrl }) => (
              <SwiperSlide
                className={clsx('!w-full')}
                style={{
                  height: '70vh',
                }}
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
            {images.map(({ url, height, width, placeholderUrl }, i) => (
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
                    i === currentRealIndex ? 'border-secondary' : 'border-transparent',
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

const ImagesSwiper = ({
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
      <FullScreenSwiper
        closeModal={() => setIsFullScreen(false)}
        isOpen={isFullScreen}
        images={images}
        type={type}
        initialSlide={currentRealIndex}
      />
    </>
  );
};

export default ImagesSwiper;
