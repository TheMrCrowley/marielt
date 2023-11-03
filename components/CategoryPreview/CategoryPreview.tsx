import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import LinkButton from '@/components/LinkButton';
import Title from '@/components/Title';
import Typography from '@/components/Typography';
import { HomePageItem } from '@/types/HomePage';

// TODO Change Name
const CategoryPreview = ({ description, title, image, variant, to, type }: HomePageItem) => {
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
      <Title
        fontSize={40}
        className={clsx(
          'flex',
          'items-end',
          'lg:gap-6',
          'gap-4',
          'uppercase',
          'before:block',
          'lg:before:w-3',
          'lg:before:h-16',
          'sm:before:w-2',
          'sm:before:h-12',
          'before:w-1.5',
          'before:h-9',
          'before:bg-no-repeat',
          'before:bg-contain',
          'before:bg-[url(/shape.svg)]',
        )}
      >
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
