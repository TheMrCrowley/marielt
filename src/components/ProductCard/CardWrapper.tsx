import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

import CardMapPinIcon from '@/public/card-map-pin.svg';
import ImagePlaceholder from '@/public/card-placeholder.png';
import Button from '@/src/components/common/Button';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';

interface CardWrapperProps extends PropsWithChildren {
  address: string;
  title?: string;
  imgUrl?: string;
  to: string;
}

const CardWrapper = ({ to, imgUrl, title, address, children }: CardWrapperProps) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'md:max-w-[330px]',
        'max-w-[300px]',
        'w-full',
        'bg-[#262626]',
        'md:h-[450px]',
        'h-[400px]',
      )}
    >
      <Link href={to} target="_blank" rel="noopener noreferrer">
        <Image
          className={clsx('object-cover')}
          src={imgUrl || ImagePlaceholder}
          width={330}
          height={165}
          alt="product-card"
        />
      </Link>
      <div
        className={clsx(
          'flex',
          'flex-col',
          'flex-auto',
          'md:pt-3',
          'md:pb-5',
          'md:px-5',
          'p-2',
          'gap-2',
        )}
      >
        <Title
          className={clsx('text-ellipsis', 'whitespace-nowrap', 'overflow-hidden', 'w-full')}
          variant="h2"
          fontSize={20}
        >
          {title || 'Тут могло быть ваше название'}
        </Title>
        <div className={clsx('flex', 'items-center', 'gap-2')}>
          <Image src={CardMapPinIcon} alt="card-map-pin" />
          <Typography
            fontSize={16}
            className={clsx(
              'text-ellipsis',
              'whitespace-nowrap',
              'overflow-hidden',
              'w-full',
              'opacity-50',
            )}
          >
            {address}
          </Typography>
        </div>
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
