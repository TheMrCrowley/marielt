import Image from 'next/image';
import React from 'react';

import Logo from '@/public/logo.svg';

import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Image alt="logo" src={Logo.src} width={212} height={40} />
    </header>
  );
};

export default Header;
