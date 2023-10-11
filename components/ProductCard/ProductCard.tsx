import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import Title from '@/components/Title';
import Typography from '@/components/Typography';
import { convertToMonetary } from '@/helpers/formatters';
import { getPriceByArea } from '@/helpers/getPriceByArea';
import FloorIcon from '@/public/card-floor.svg';
import CardMapPinIcon from '@/public/card-map-pin.svg';
import { Product } from '@/services/actualProducts';

import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard = async ({ product }: ProductCardProps) => {
  const {
    address,
    currency,
    floor,
    livingArea,
    maxFloor,
    priceCurrency,
    productId,
    title,
    totalArea,
    priceBYN,
    imgSrc,
  } = product;

  return (
    <div className={styles.cardWrapper}>
      <Image src={imgSrc} width={330} height={165} alt="" />
      <div className={styles.cardDescriptionWrapper}>
        <Title variant="h2" fontSize={20}>
          {title}
        </Title>
        <div className={styles.cardDescriptionItem}>
          <Image src={CardMapPinIcon} alt="card-map-pin" />
          <p className={clsx(styles.cardDescriptionText, styles.halfOpacity)}>{address}</p>
        </div>
        <div className={styles.cardDescriptionItem}>
          <Image src={FloorIcon} alt="floor" />
          <p className={styles.cardDescriptionText}>
            {floor}
            <span className={styles.halfOpacity}>/{maxFloor}</span>
          </p>
        </div>
        <div className={styles.area}>
          <div className={styles.areaItem}>
            <p className={styles.areaItemText}>
              {totalArea}
              <span>
                м<sup>2</sup>
              </span>
            </p>
            <p className={styles.areaItemDescription}>общая</p>
          </div>
          <div className={styles.areaItem}>
            <p className={styles.areaItemText}>
              {livingArea}
              <span>
                м<sup>2</sup>
              </span>
            </p>
            <p className={styles.areaItemDescription}>жилая</p>
          </div>
          <div className={styles.areaItem}>
            <p className={styles.areaItemText}>{getPriceByArea(priceCurrency, totalArea)}$</p>
            <p className={styles.areaItemDescription}>
              за м<sup>2</sup>
            </p>
          </div>
        </div>
        <div className={styles.prices}>
          <p className={styles.mainPrice}>
            {currency === 'USD'
              ? convertToMonetary(priceCurrency, 'USD')
              : convertToMonetary(priceCurrency, 'EUR')}
          </p>
          <p className={clsx(styles.secondPrice, styles.halfOpacity)}>
            {convertToMonetary(priceBYN, 'BYN')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;