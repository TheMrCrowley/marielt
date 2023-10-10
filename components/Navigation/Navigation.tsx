import React from 'react';

import { AppRoutes, navigationMap } from '@/enums/AppRoutes';

import styles from './Navigation.module.css';
import NavigationItem, { NavItem } from './NavigationItem';

const navItems: NavItem[] = Object.entries(AppRoutes).map(([key, value]) => ({
  title: navigationMap[key as keyof typeof AppRoutes],
  href: value,
}));

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navItems.map((navItem) => (
          <NavigationItem navItem={navItem} key={navItem.title} />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
