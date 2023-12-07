import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ArrowIcon from '@/public/arrow-left.svg';
import Typography from '@/src/components/common/Typography';
import { AppChildRoutes, AppRoutes } from '@/src/enums/AppRoutes';

interface BackButtonProps {
  to: AppRoutes | AppChildRoutes;
  className?: string;
}

const BackButton = ({ to, className }: BackButtonProps) => {
  return (
    <Link
      href={to}
      className={clsx(
        'flex',
        'gap-4',
        'justify-center',
        'items-center',
        'p-2',
        'hover:cursor-pointer',
        className,
      )}
    >
      <Image src={ArrowIcon} alt="arrow-back" />
      <Typography fontWeight="medium" color="text-[#B1B1B1]">
        Назад
      </Typography>
    </Link>
  );
};

export default BackButton;
