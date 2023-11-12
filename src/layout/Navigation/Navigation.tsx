'use client';

import clsx from 'clsx';
import React from 'react';

import { AppRoutes, navigationMap } from '@/src/enums/AppRoutes';
import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';

import NavigationItem, { NavItem } from './NavigationItem';

const navItems: NavItem[] = Object.entries(AppRoutes).map(([key, value]) => ({
  title: navigationMap[key as keyof typeof AppRoutes],
  href: value,
}));

const Navigation = () => {
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
        {navItems.map((navItem) => (
          <NavigationItem navItem={navItem} key={navItem.title} />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
