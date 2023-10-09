'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import styles from './NavigationItem.module.css';

export interface NavItem {
  title: string;
  href: string;
}

interface NavigationItemProps {
  navItem: NavItem;
}

const NavigationItem = ({ navItem }: NavigationItemProps) => {
  const { href, title } = navItem;
  const pathname = usePathname();

  return (
    <li className={styles.navigationItem}>
      <Link
        className={clsx(styles.navigationLink, pathname === href && styles.active)}
        href={href}
        // target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </Link>
    </li>
  );
};

export default NavigationItem;
