import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import LinkButton from '@/components/LinkButton';
import Title from '@/components/Title';
import { HomePageItem } from '@/types/HomePage';

import styles from './CategoryPreview.module.css';

// TODO Change Name
const CategoryPreview = ({ description, title, image, variant, to, type }: HomePageItem) => {
  const renderDescription = () => (
    <div className={styles.descriptionWrapper}>
      <Title fontSize={40} className={styles.descriptionTitle}>
        {title}
      </Title>
      <p className={styles.description}>{description}</p>
      <LinkButton to={to} type={type} />
    </div>
  );

  const renderPreview = () => {
    switch (variant) {
      case 'primary':
        return (
          <>
            {renderDescription()}
            <Image src={image.src} width={image.width} height={image.height} alt="" />
          </>
        );
      case 'secondary':
        return (
          <>
            <Image src={image.src} width={image.width} height={image.height} alt="" />
            {renderDescription()}
          </>
        );
    }
  };

  return (
    <div className={clsx('container')}>
      <div className={styles.wrapper}>{renderPreview()}</div>
    </div>
  );
};

export default CategoryPreview;
