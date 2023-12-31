'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { AppRoutes } from '@/src/enums/AppRoutes';

export interface NavItem {
  title: string;
  href: AppRoutes;
}

interface NavigationItemProps {
  navItem: NavItem;
  onClick?: () => void;
  className?: string;
}

const NavigationItem = ({ navItem, onClick, className }: NavigationItemProps) => {
  const { href, title } = navItem;
  const pathname = usePathname();

  return (
    <li className={clsx('text-center', 'lg:text-xl', 'text-base', className)}>
      <Link
        prefetch
        className={clsx(
          'w-full',
          'relative',
          'lg:min-h-[100px]',
          'min-h-[60px]',
          'flex',
          'justify-center',
          'items-center',
          'transition-all',
          'after:block',
          'after:absolute',
          'after:left-1/2',
          'after:bottom-0',

          'after:h-[2px]',
          'after:bg-secondary',
          'after:transition-all',
          'after:-translate-x-1/2',
          pathname.includes(href) ? 'text-secondary' : 'text-white',
          pathname.includes(href) ? 'after:w-full' : 'after:w-0',
        )}
        href={href}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        {title}
      </Link>
    </li>
  );
};

export default NavigationItem;
