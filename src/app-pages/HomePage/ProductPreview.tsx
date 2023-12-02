import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import LinkButton from '@/src/components/LinkButton';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { getProductTypeByRoute } from '@/src/helpers/getProductTypeByRoute';
import { HomePageItem } from '@/src/types/HomePage';

import ProductSliderWrapper from './ProductSliderWrapper';

interface ProductPreviewProps {
  data: HomePageItem;
}

const ProductPreview = ({ data }: ProductPreviewProps) => {
  const type = getProductTypeByRoute(data.to);

  const { variant, description, image, title, to } = data;

  const renderDescription = () => (
    <div
      className={clsx(
        'flex-auto',
        'flex',
        'flex-col',
        'lg:gap-12',
        'sm:gap-8',
        'gap-4',
        'md:w-6/12',
        'w-full',
        'sm:p-[4%]',
        'px-5',
        'py-8',
      )}
    >
      <Title fontSize={40} className={clsx('flex', 'items-end', 'lg:gap-6', 'gap-4', 'uppercase')}>
        {title}
      </Title>
      <Typography fontWeight="light">{description}</Typography>
      <LinkButton to={to} type={data.type} linkClassName={clsx('mt-auto', 'ml-auto')} />
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
              placeholder="blur"
              blurDataURL={image.placeholder}
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
              placeholder="blur"
              blurDataURL={image.placeholder}
              alt=""
            />
            {renderDescription()}
          </>
        );
    }
  };

  return (
    <section className={clsx('flex', 'flex-col', 'gap-8')}>
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
            'mb-4',
          )}
        >
          {renderPreview()}
        </div>
        <ProductSliderWrapper type={type} />
      </div>
    </section>
  );
};

export default ProductPreview;
