import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import LinkButton from '@/components/LinkButton';
import Title from '@/components/Title';
import Typography from '@/components/Typography';
import { HomePageItem } from '@/types/HomePage';

interface OpportunityPreviewProps {
  opportunity: HomePageItem;
}

const OpportunityPreview = ({ opportunity }: OpportunityPreviewProps) => {
  const { description, image, title, to, type } = opportunity;
  return (
    <section className={clsx('py-20', 'w-full')}>
      <div
        className={clsx('container', 'flex', 'flex-col', 'md:flex-row', 'gap-7', 'justify-between')}
      >
        <div className={clsx('flex', 'flex-col', 'gap-y-12', 'max-w-screen-sm')}>
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
        />
      </div>
    </section>
  );
};

export default OpportunityPreview;