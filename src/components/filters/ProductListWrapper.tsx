'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

import MapIcon from '@/public/map.png';
import Pagination from '@/src/components/common/Pagination';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

import SortSelect from './SortSelect';

interface ProductListWrapperProps extends PropsWithChildren {
  pagination: StrapiFindResponse<{}>['meta']['pagination'];
}

const ProductListWrapper = ({
  pagination: { page, pageCount },
  children,
}: ProductListWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (to: number) => {
    const currentSearchParams = new URLSearchParams(window.location.search);

    currentSearchParams.set('page', to.toString());

    router.push(pathname + '?' + currentSearchParams.toString(), {
      scroll: true,
    });
  };

  const handleViewChange = () => {
    const currentSearchParams = new URLSearchParams(window.location.search);

    router.push(pathname + '/map' + '?' + currentSearchParams.toString(), {
      scroll: true,
    });
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
      <div className={clsx('w-full', 'flex', 'items-center', 'justify-end', 'gap-8')}>
        <SortSelect />
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
          onClick={handleViewChange}
        >
          <Image src={MapIcon} alt="map-icon" />
          На карте
        </button>
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
      <Pagination currentPage={page} totalPages={pageCount} onChange={handlePageChange} />
    </section>
  );
};

export default ProductListWrapper;
