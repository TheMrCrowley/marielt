import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Logo from '@/public/logo.svg';
import BurgerMenu from '@/src/layout/BurgerMenu';
import Navigation from '@/src/layout/Navigation';

const Header = () => {
  return (
    <>
      <header
        className={clsx(
          'px-5',
          'flex',
          'sm:justify-center',
          'justify-between',
          'items-center',
          'xl:h-36',
          'lg:h-28',
          'md:h-20',
          'h-16',
          'bg-contain',
          'sm:bg-[url(/header-background.png)]',
          'bg-[url(/header_bg_mob.png)]',
          'bg-[#3D3D3D]',
          'sm:bg-bottom',
          'bg-right',
          'bg-no-repeat',
          'border-b',
          'border-solid',
          'border-white',
          'sm:relative',
          'fixed',
          'sm:z-0',
          'z-50',
          'w-full',
        )}
      >
        <Link href="/">
          <Image
            alt="logo"
            src={Logo}
            className={clsx('lg:w-[220px]', 'md:w-[200px]', 'sm:w-[180px]', 'w-[120px]')}
          />
        </Link>
        <BurgerMenu />
      </header>
      <Navigation />
    </>
  );
};

export default Header;
