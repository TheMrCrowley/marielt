import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import LinkButton from '@/src/components/LinkButton';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { HomePageItem } from '@/src/types/HomePage';

interface OpportunityPreviewProps {
  opportunity: HomePageItem;
}

const OpportunityPreview = ({ opportunity }: OpportunityPreviewProps) => {
  const { description, image, title, to, type } = opportunity;

  return (
    <section className={clsx('lg:py-20', 'sm:py-16', 'py-7', 'w-full', 'even:bg-primary-medium')}>
      <div
        className={clsx('container', 'flex', 'flex-col', 'md:flex-row', 'gap-7', 'justify-between')}
      >
        <div
          className={clsx('flex', 'flex-col', 'lg:gap-12', 'sm:gap-8', 'gap-5', 'max-w-screen-sm')}
        >
          <Title fontSize={40}>{title}</Title>
          <Typography fontSize={20} fontWeight="light">
            {description}
          </Typography>
          <LinkButton to={to} type={type} linkClassName="mt-auto" />
        </div>
        <Image
          className="object-cover"
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
          unoptimized
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default OpportunityPreview;
