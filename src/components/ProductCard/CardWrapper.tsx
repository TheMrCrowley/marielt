import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

import CardMapPinIcon from '@/public/card-map-pin.svg';
import ImagePlaceholder from '@/public/card-placeholder.jpg';
import MetroIcon from '@/public/metro-icon.svg';
import Button from '@/src/components/common/Button';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';

interface CardWrapperProps extends PropsWithChildren {
  address?: string;
  placeholderUrl?: string;
  to: string;
  imgUrl?: string;
  title?: string;
  wrapperClassName?: string;
  metro?: string;
}

const CardWrapper = ({
  to,
  imgUrl,
  title,
  address,
  children,
  placeholderUrl,
  wrapperClassName,
  metro,
}: CardWrapperProps) => {
  return (
    <div className={clsx('bg-primary-bold', 'grid', 'w-full', 'h-full', wrapperClassName)}>
      <Link href={to} target="_blank" rel="noopener noreferrer">
        <Image
          className={clsx('object-cover', 'w-full', 'h-[165px]')}
          src={imgUrl || ImagePlaceholder}
          placeholder="blur"
          blurDataURL={placeholderUrl || ImagePlaceholder.blurDataURL}
          width={330}
          height={160}
          loading="lazy"
          alt="product-card"
        />
      </Link>
      <div
        className={clsx(
          'md:py-3',
          'md:px-5',
          'p-2',
          'gap-4',
          'grid',
          'justify-items-stretch',
          'grid-flow-row',
        )}
      >
        <Title
          className={clsx('max-w-full', 'w-full', 'text-ellipsis', 'line-clamp-2')}
          variant="h2"
          fontSize={20}
        >
          {title || 'Тут могло быть ваше название'}
        </Title>
        <div
          className={clsx(
            'flex',
            'items-center',
            'gap-2',
            'max-w-full',
            'w-full',
            'overflow-hidden',
          )}
        >
          <Image src={CardMapPinIcon} alt="card-map-pin" />
          <Typography
            fontSize={16}
            className={clsx('max-w-full', 'w-full', 'text-ellipsis', 'line-clamp-2')}
          >
            {address}
          </Typography>
        </div>
        {metro && (
          <div
            className={clsx(
              'flex',
              'items-center',
              'gap-2',
              'max-w-full',
              'w-full',
              'overflow-hidden',
            )}
          >
            <div className={clsx('flex', 'gap-1.5')}>
              <Image alt="map-pin" src={MetroIcon} />
              <Typography fontSize={16}>{metro}</Typography>
            </div>
          </div>
        )}
        <div className={clsx('flex-auto', 'flex', 'flex-col', 'gap-4', 'mt-auto', 'justify-end')}>
          {children}
        </div>
        <Link href={to} target="_blank" rel="noopener noreferrer">
          <Button buttonType="bordered" className="w-full">
            Подробнее
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CardWrapper;
