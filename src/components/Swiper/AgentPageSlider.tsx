'use client';

import Image from 'next/image';
import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { AgentPageData } from '@/src/types/CareersTypes';

interface AgentPageSliderProps {
  media: AgentPageData['media'];
}

const AgentPageSlider = ({ media }: AgentPageSliderProps) => {
  const renderSlide = (item: (typeof media)[number]) => {
    if (item.type === 'image') {
      return (
        <SwiperSlide
          lazy
          onLoad={() => {}}
          className="!w-max lg:!h-72 md:!h-60 xs:!h-48 !h-40"
          key={`agent-page-slider-slide-${item.type}-${item.url}`}
        >
          <Image
            src={item.url}
            placeholder="blur"
            loading="lazy"
            unoptimized
            blurDataURL={item.placeholder!}
            width={item.width}
            height={item.height}
            alt=""
            className="object-contain h-full w-auto"
          />
        </SwiperSlide>
      );
    }

    return (
      <SwiperSlide
        className="!min-w-[150px] !w-max lg:!h-72 sm:!h-60 xs:!h-48 !h-40"
        key={`agent-page-slider-slide-${item.type}-${item.url}`}
      >
        <video src={item.url} controls className="h-full w-full" />
      </SwiperSlide>
    );
  };

  return (
    <section>
      <Swiper grabCursor spaceBetween={20} slidesPerView="auto">
        {media.map(renderSlide)}
      </Swiper>
    </section>
  );
};

export default AgentPageSlider;
