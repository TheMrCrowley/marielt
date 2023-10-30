'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import PrevIcon from '@/public/chevron-left.svg';
import NextIcon from '@/public/chevron-right.svg';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

const PAGE_RANGE = 5;

const PaginationButton = ({
  isActive,
  page,
  onClick,
}: {
  isActive: boolean;
  page: number;
  onClick: (page: number) => void;
}) => {
  return (
    <button
      className={clsx(
        'text-[20px]',
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
        isActive && 'text-[#262626]',
      )}
      onClick={() => onClick(page)}
      disabled={isActive}
    >
      {page}
    </button>
  );
};

const Pagination = ({ currentPage, onChange, totalPages }: PaginationProps) => {
  console.log({ totalPages });
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
              onClick={onChange}
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
              onClick={onChange}
              key={`pagination-page-${i}`}
            />,
          );
        }

        return pages.reverse();
      }
    }

    const start = currentPage - 2;
    const end = currentPage + 2;

    const pages = [];

    for (let i = start; i <= end; i++) {
      const isActive = currentPage === i;

      pages.push(
        <PaginationButton
          isActive={isActive}
          page={i}
          onClick={onChange}
          key={`pagination-page-${i}`}
        />,
      );
    }

    return pages;
  };

  return (
    <div className={clsx('flex', 'max-w-lg', 'justify-between', 'gap-x-2')}>
      <button
        className={clsx(
          'flex',
          'gap-x-4',
          'justify-center',
          'items-center',
          'text-[20px]',
          'border-b',
          'border-solid',
          'py-3',
          'px-4',
          'border-secondary',
          'text-white',
          'disabled:opacity-50',
        )}
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Image src={PrevIcon} alt="next-icon" />
        Назад
      </button>
      {renderPages()}
      <button
        className={clsx(
          'flex',
          'gap-x-4',
          'justify-center',
          'items-center',
          'text-[20px]',
          'border-b',
          'border-solid',
          'py-3',
          'px-4',
          'border-secondary',
          'text-white',
          'disabled:opacity-50',
        )}
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Вперед
        <Image src={NextIcon} alt="next-icon" />
      </button>
    </div>
  );
};

export default Pagination;
