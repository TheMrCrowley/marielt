'use client';

import clsx from 'clsx';
import React from 'react';

import { getVideoId } from '@/src/helpers/videoHelpers';
import { StrapiVideo } from '@/src/types/VideoLink';

const AgentVideoSection = ({ video }: { video: StrapiVideo }) => {
  return (
    <section
      className={clsx(
        'w-full',
        'flex',
        'justify-center',
        'items-center',
        'bg-center',
        'bg-cover',
        'bg-no-repeat',
      )}
      style={{
        backgroundImage: `url(${video.thumbnail})`,
      }}
    >
      <div
        className={clsx('w-full', 'flex', 'justify-center', 'items-center')}
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.youtube.com/embed/${getVideoId(
            video.url,
          )}?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="${
            video.title
          }" class="md:max-w-3xl sm:max-w-lg w-full aspect-video"/>`,
        }}
      />
    </section>
  );
};

export default AgentVideoSection;
