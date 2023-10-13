import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import LinkButton from '@/components/LinkButton';
import Title from '@/components/Title';
import Typography from '@/components/Typography';
import { HomePageItem } from '@/types/HomePage';

import styles from './CategoryPreview.module.css';

// TODO Change Name
const CategoryPreview = ({ description, title, image, variant, to, type }: HomePageItem) => {
  const renderDescription = () => (
    <div
      className={clsx('flex-auto', 'flex', 'flex-col', 'gap-y-12', 'w-full', 'md:w-6/12', 'p-[4%]')}
    >
      <Title fontSize={40} className={styles.descriptionTitle}>
        {title}
      </Title>
      <Typography fontWeight="light">{description}</Typography>
      <LinkButton to={to} type={type} linkClassName={clsx('mt-auto', 'ml-auto')} />
    </div>
  );

  const renderPreview = () => {
    switch (variant) {
      case 'primary':
        return (
          <>
            {renderDescription()}
            <Image
              className="object-cover"
              src={image.src}
              width={image.width}
              height={image.height}
              alt=""
            />
          </>
        );
      case 'secondary':
        return (
          <>
            <Image
              className="object-cover"
              src={image.src}
              width={image.width}
              height={image.height}
              alt=""
            />
            {renderDescription()}
          </>
        );
    }
  };

  return (
    <div className={clsx('container')}>
      <div
        className={clsx(
          'w-full',

          'flex',
          'flex-col',
          'md:flex-row',
          'justify-between',
          // TODO add colors to TAILWIND
          'bg-[#343434]',
        )}
      >
        {renderPreview()}
      </div>
    </div>
  );
};

export default CategoryPreview;
