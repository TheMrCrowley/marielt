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
    <section className={clsx('flex', 'flex-col', 'items-center', 'gap-4', 'basis-2/3', 'w-full')}>
      <div className={clsx('flex', 'justify-between', 'flex-wrap', 'gap-8')}>{children}</div>
      <Pagination currentPage={page} totalPages={pageCount} onChange={handlePageChange} />
    </section>
  );
};

export default ProductListWrapper;
