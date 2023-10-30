'use client';

import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import Pagination from '@/components/Pagination';
import FlatCard from '@/components/ProductCard/FlatCard';
import { DefaultFlatItem } from '@/services/flats';
import { StrapiFindResponse } from '@/types/StrapiFindResponse';

interface FlatsListProps {
  flats: DefaultFlatItem[];
  pagination: StrapiFindResponse<{}>['meta']['pagination'];
}

const FlatsList = ({ flats, pagination: { page, pageCount } }: FlatsListProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (to: number) => {
    const currentSearchParams = new URLSearchParams(window.location.search);

    currentSearchParams.set('page', to.toString());

    router.push(pathname + '?' + currentSearchParams.toString(), {
      scroll: false,
    });
  };

  return (
    <section className="container">
      <section
        className={clsx(
          'max-w-7xl',
          'flex',
          'gap-x-12',
          'gap-y-8',
          'py-20',
          'flex-wrap',
          'justify-center',
        )}
      >
        {flats.map((flat) => (
          <FlatCard flatItem={flat} key={`flats-list-flats-item-${flat.id}`} />
        ))}
        <Pagination currentPage={page} totalPages={pageCount} onChange={handlePageChange} />
      </section>
    </section>
  );
};

export default FlatsList;
