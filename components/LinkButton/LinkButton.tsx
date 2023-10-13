import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ArrowRight from '@/public/arrow-right.svg';
import { HomePageItem } from '@/types/HomePage';

interface LinkButtonProps {
  type: HomePageItem['type'];
  to: HomePageItem['to'];
  buttonClassName?: string;
  linkClassName?: string;
}

const LinkButton = ({ type, to, buttonClassName, linkClassName }: LinkButtonProps) => {
  return (
    <Link href={`${to}`} className={linkClassName}>
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
          'text-xl',
          //TODO add transition to TAILWIND
          'transition-colors',
          'duration-300',
          'ease-in-out',
          'hover:bg-[#ffffff40]',
          buttonClassName,
        )}
      >
        {type === 'product' ? 'Перейти в каталог' : 'Перейти в раздел'}{' '}
        <Image src={ArrowRight} alt="arrow-right" />
      </button>
    </Link>
  );
};

export default LinkButton;
