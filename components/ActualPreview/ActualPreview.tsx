import React from 'react';

import ActualProductSlider from '@/components/ActualProductSlider';
import CategoryPreview from '@/components/CategoryPreview';
import { getProductTypeByRoute } from '@/helpers/getProductTypeByRoute';
import { HomePageItem } from '@/types/HomePage';

import styles from './ActualPreview.module.css';

interface ActualPreviewProps {
  data: HomePageItem;
}

const ActualPreview = ({ data }: ActualPreviewProps) => {
  const type = getProductTypeByRoute(data.to);

  return (
    <section className={styles.wrapper}>
      <CategoryPreview {...data} />
      <ActualProductSlider type={type} />
    </section>
  );
};

export default ActualPreview;
