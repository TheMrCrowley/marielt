import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ArrowRight from '@/public/arrow-right.svg';
import { HomePageItem } from '@/types/HomePage';

import styles from './CategoryPreview.module.css';

// TODO Change Name
const CategoryPreview = ({ description, title, image, variant, to }: HomePageItem) => {
  const renderDescription = () => (
    <div className={styles.descriptionWrapper}>
      <h2 className={styles.descriptionTitle}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {/* TODO change to Link */}
      <Link href={`${to}`}>
        <button className={styles.descriptionButton}>
          Перейти в каталог <Image src={ArrowRight} alt="arrow-right" />
        </button>
      </Link>
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
