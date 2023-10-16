import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Logo from '@/public/logo.svg';

const Header = () => {
  return (
    <header
      // className={styles.header}
      className={clsx(
        'pb-10',
        'flex',
        'justify-center',
        'items-end',
        'bg-no-repeat',
        'bg-bottom',
        'h-[140px]',
        'bg-[url(/header-background.png)]',
        'bg',
        'border-b',
        'border-solid',
        'border-white',
      )}
    >
      <Link href="/">
        <Image alt="logo" src={Logo.src} width={212} height={40} />
      </Link>
    </header>
  );
};

export default Header;
