'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

import PrevIcon from '@/public/chevron-left.svg';
import NextIcon from '@/public/chevron-right.svg';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const PAGE_RANGE = 5;

const PaginationButton = ({
  isActive,
  to,
  page,
}: {
  isActive: boolean;
  to: string;
  page: number;
}) => {
  return (
    <Link href={to} prefetch>
      <button
        className={clsx(
          'text-xl',
          'border-b',
          'border-solid',
          'py-3',
          'px-4',
          'justify-center',
          'items-center',
          'border-[#B1B1B1]',
          !isActive && 'text-[#B1B1B1]',
          isActive && 'border-secondary',
          isActive && 'bg-secondary',
          isActive && 'text-primary-bold',
        )}
        disabled={isActive}
      >
        {page}
      </button>
    </Link>
  );
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const url = (page: number) => {
    const currentSearchParams = new URLSearchParams(searchParams);

    currentSearchParams.set('page', page.toString());

    return pathname + '?' + currentSearchParams.toString();
  };

  const renderPages = () => {
    const isEdge =
      currentPage === 1 ||
      currentPage === totalPages ||
      currentPage === 2 ||
      currentPage === totalPages - 1;

    if (isEdge) {
      if (currentPage === 1 || currentPage === 2) {
        const pages = [];

        const end = PAGE_RANGE > totalPages ? totalPages : PAGE_RANGE;

        for (let i = 1; i <= end; i++) {
          const isActive = currentPage === i;

          pages.push(
            <PaginationButton
              isActive={isActive}
              page={i}
              to={url(i)}
              key={`pagination-page-${i}`}
            />,
          );
        }

        return pages;
      }

      if (currentPage === totalPages || currentPage === totalPages - 1) {
        const pages = [];

        const end = totalPages - PAGE_RANGE >= 0 ? totalPages - PAGE_RANGE : 0;

        for (let i = totalPages; i > end; i--) {
          const isActive = currentPage === i;

          pages.push(
            <PaginationButton
              isActive={isActive}
              page={i}
              to={url(i)}
              key={`pagination-page-${i}`}
            />,
          );
        }

        return pages.reverse();
      }
    }

    const start = currentPage - 2;
    const end = currentPage + 2 < totalPages ? currentPage + 2 : totalPages;

    const pages = [];

    for (let i = start; i <= end; i++) {
      const isActive = currentPage === i;

      pages.push(
        <PaginationButton isActive={isActive} page={i} to={url(i)} key={`pagination-page-${i}`} />,
      );
    }

    return pages;
  };

  return (
    <div className={clsx('flex', 'max-w-lg', 'justify-between', 'gap-x-2')}>
      <Link href={url(currentPage - 1)} prefetch>
        <button
          className={clsx(
            'flex',
            'gap-x-4',
            'justify-center',
            'items-center',
            'text-xl',
            'border-b',
            'border-solid',
            'py-3',
            'px-4',
            'border-secondary',
            'text-white',
            'disabled:opacity-50',
          )}
          disabled={currentPage === 1}
        >
          <Image src={PrevIcon} alt="next-icon" />
          Назад
        </button>
      </Link>

      {renderPages()}
      <Link href={url(currentPage + 1)} prefetch>
        <button
          className={clsx(
            'flex',
            'gap-x-4',
            'justify-center',
            'items-center',
            'text-xl',
            'border-b',
            'border-solid',
            'py-3',
            'px-4',
            'border-secondary',
            'text-white',
            'disabled:opacity-50',
          )}
          disabled={currentPage === totalPages}
        >
          Вперед
          <Image src={NextIcon} alt="next-icon" />
        </button>
      </Link>
    </div>
  );
};

export default Pagination;
