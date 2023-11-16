'use client';

import clsx from 'clsx';
import React from 'react';

import { AppRoutes } from '@/src/enums/AppRoutes';
import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';

import NavigationItem from './NavigationItem';

interface NavigationProps {
  navigationItems: Array<{
    title: string;
    to: AppRoutes;
  }>;
}

const Navigation = ({ navigationItems }: NavigationProps) => {
  const breakpoint = useWindowSize();

  if (breakpoint < WindowWidth.SM) {
    return null;
  }

  return (
    <nav className={clsx('px-4', 'flex', 'justify-center', 'items-center')}>
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
