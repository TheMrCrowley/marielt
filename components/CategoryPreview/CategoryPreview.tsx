import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

import ArrowRight from '@/public/arrow-right.svg';

import styles from './CategoryPreview.module.css';

interface CategoryPreviewProps {
  title: string;
  description: string;
  image: StaticImageData;
  variant?: 'primary' | 'secondary';
}

// TODO Change Name
const CategoryPreview = ({
  description,
  title,
  image,
  variant = 'primary',
}: CategoryPreviewProps) => {
  const renderDescription = () => (
    <div className={styles.descriptionWrapper}>
      <h2 className={styles.descriptionTitle}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {/* TODO change to Link */}
      <button className={styles.descriptionButton}>
        Перейти в каталог <Image src={ArrowRight} alt="arrow-right" />
      </button>
    </div>
  );

  const renderPreview = () => {
    switch (variant) {
      case 'primary':
        return (
          <>
            {renderDescription()}
            <Image src={image} alt="" placeholder="blur" />
          </>
        );
      case 'secondary':
        return (
          <>
            <Image src={image} alt="" placeholder="blur" />
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
