import Image from 'next/image';
import React from 'react';

import ArrowRight from '@/public/arrow-right.svg';

import styles from './CategoryPreview.module.css';

interface CategoryPreviewProps {
  title: string;
  description: string;
  image: React.ReactElement;
  variant?: 'primary' | 'secondary';
}

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
            {image}
          </>
        );
      case 'secondary':
        return (
          <>
            {image}
            {renderDescription()}
          </>
        );
    }
  };

  return <div className={styles.wrapper}>{renderPreview()}</div>;
};

export default CategoryPreview;
