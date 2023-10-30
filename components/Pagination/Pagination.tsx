'use client';

import clsx from 'clsx';
import React from 'react';

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
  const renderPages = () => {
    const isEdge =
      currentPage === 1 ||
      currentPage === totalPages ||
      currentPage === 2 ||
      currentPage === totalPages - 1;

    if (isEdge) {
      if (currentPage === 1 || currentPage === 2) {
        const pages = [];

        for (let i = 1; i <= PAGE_RANGE; i++) {
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

        for (let i = totalPages; i > totalPages - PAGE_RANGE; i--) {
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
    <div className={clsx('flex', 'justify-between', 'gap-x-2')}>
      <button
        className={clsx(
          'text-[20px]',
          'border-b',
          'border-solid',
          'py-3',
          'px-4',
          'border-[#B1B1B1]',
          'text-white',
          'disabled:opacity-50',
        )}
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {renderPages()}
      <button
        className={clsx(
          'text-[20px]',
          'border-b',
          'border-solid',
          'py-3',
          'px-4',
          'border-[#B1B1B1]',
          'text-white',
          'disabled:opacity-50',
        )}
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
