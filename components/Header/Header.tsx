import React from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import Logo from '@/public/logo.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <Image alt="logo" src={Logo.src} width={212} height={40} />
    </header>
  );
};

export default Header;
