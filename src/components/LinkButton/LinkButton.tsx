import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ArrowRight from '@/public/arrow-right.svg';
import { AppChildRoutes, AppRoutes } from '@/src/enums/AppRoutes';

export interface LinkButtonProps {
  type: 'product' | 'opportunity' | 'vacancy';
  to: AppRoutes | AppChildRoutes | string;
  buttonClassName?: string;
  linkClassName?: string;
}

const getTextByType = (type: LinkButtonProps['type']) => {
  switch (type) {
    case 'product':
      return 'Перейти в каталог';
    case 'opportunity':
      return 'Перейти в раздел';
    case 'vacancy':
      return 'Узнать больше';
    default:
      return null as never;
  }
};

const LinkButton = ({ type, to, buttonClassName, linkClassName }: LinkButtonProps) => {
  return (
    <Link href={`${to}`} className={linkClassName} prefetch>
      <button
        className={clsx(
          //TODO think how to improve this
          'flex',
          'justify-between',
          'items-center',
          'gap-7',
          'h-[50px]',
          'w-max',
          'py-[12px]',
          'pr-4',
          'pl-6',
          'border-b',
          'border-solid',
          // TODO add colors to TAILWIND
          'border-[#E3C496]',
          'text-[#E3C496]',
          'font-medium',
          'lg:text-xl',
          'text-base',
          //TODO add transition to TAILWIND
          'transition-colors',
          'duration-300',
          'ease-in-out',
          'hover:bg-[#ffffff40]',
          buttonClassName,
        )}
      >
        {getTextByType(type)}
        <Image src={ArrowRight} alt="arrow-right" />
      </button>
    </Link>
  );
};

export default LinkButton;
