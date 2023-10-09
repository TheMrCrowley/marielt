import React from 'react';

import styles from './Navigation.module.css';
import NavigationItem, { NavItem } from './NavigationItem';

const navItems: NavItem[] = [
  { title: 'Квартиры', href: '/apartments' },
  { title: 'Дома и Участки', href: '/house-and-lots' },
  { title: 'Коммерческая недвижимость', href: '/commercial' },
  { title: 'Профессия ', href: '/profession' },
  { title: 'Вакансии', href: '/careers' },
  { title: 'Академия MARIELT', href: '/academy' },
];

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
