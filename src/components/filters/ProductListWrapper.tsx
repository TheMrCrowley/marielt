'use client';

import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

import Pagination from '@/src/components/common/Pagination';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

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

  return (
    <section className="container flex">
      <section
        className={clsx(
          'max-w-max',
          'flex',
          'flex-col',
          'py-20',
          'items-center',
          'gap-y-10',
          'grow-0',
          'shrink',
          'basis-2/3',
        )}
      >
        <div
          className={clsx(
            'flex',
            'gap-x-12',
            'gap-y-8',
            'flex-wrap',
            'w-full',
            'justify-between',
            'items-center',
          )}
        >
          {children}
        </div>
        <Pagination currentPage={page} totalPages={pageCount} onChange={handlePageChange} />
      </section>
    </section>
  );
};

export default ProductListWrapper;
