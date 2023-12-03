'use client';

import clsx from 'clsx';
import React from 'react';

import { AppRoutes } from '@/src/enums/AppRoutes';

import NavigationItem from './NavigationItem';

interface NavigationProps {
  navigationItems: Array<{
    title: string;
    to: AppRoutes;
  }>;
}

const Navigation = ({ navigationItems }: NavigationProps) => {
  return (
    <nav
      className={clsx(
        'px-4',
        'flex',
        'justify-center',
        'items-center',
        'bg-[#3d3d3d]',
        'sticky',
        'top-0',
        'z-50',
      )}
    >
      <ul
        className={clsx(
          'max-w-6xl',
          'w-full',
          'grid',
          'grid-flow-col',
          'gap-4',
          'justify-items-center',
        )}
      >
        {navigationItems.map((navItem) => (
          <NavigationItem
            navItem={{
              href: navItem.to,
              title: navItem.title,
            }}
            key={navItem.title}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
