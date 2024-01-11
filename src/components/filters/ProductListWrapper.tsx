'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

import MapIcon from '@/public/map.png';
import Pagination from '@/src/components/common/Pagination';
import Title from '@/src/components/common/Title';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

import SortSelect from './SortSelect';

interface ProductListWrapperProps extends PropsWithChildren {
  pagination: StrapiFindResponse<{}>['meta']['pagination'];
}

const ProductListWrapper = ({
  pagination: { page, pageCount },
  children,
}: ProductListWrapperProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getMapUrl = () => {
    const currentSearchParams = new URLSearchParams(searchParams);

    return pathname + '/map' + '?' + currentSearchParams.toString();
  };
  console.log(children);
  const renderProducts = () => {
    if (children) {
      return (
        <>
          <div className={clsx('w-full', 'flex', 'items-center', 'justify-end', 'gap-8')}>
            <SortSelect />
            <Link href={getMapUrl()} prefetch>
              <button
                className={clsx(
                  'flex',
                  'justify-center',
                  'items-center',
                  'w-max',
                  'gap-4',
                  'text-[#B1B1B1]',
                  'underline',
                  'hover:cursor-pointer',
                  'transition-all',
                )}
              >
                <Image src={MapIcon} alt="map-icon" />
                На карте
              </button>
            </Link>
          </div>
          <div
            className={clsx('grid', 'w-full', 'gap-8')}
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'calc(1.25rem + 20 * ((100vw - 320px) / 1600))',
            }}
          >
            {children}
          </div>
          <Pagination currentPage={page} totalPages={pageCount} />
        </>
      );
    }

    return (
      <section className="h-full min-h-[50dvh] flex-auto">
        <Title>По вашему запросу ничего не найдено</Title>
      </section>
    );
  };

  return (
    <section
      className={clsx(
        'flex',
        'flex-col',
        'items-center',
        'gap-4',
        'max-w-screen-2xl',
        'w-full',
        'md:py-12',
        'py-6',
        'px-4',
      )}
    >
      {renderProducts()}
    </section>
  );
};

export default ProductListWrapper;
