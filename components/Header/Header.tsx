'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Navigation from '@/components/Navigation';
import { WindowWidth } from '@/enums/Width';
import { useWindowSize } from '@/helpers/useWindowSize';
import Burger from '@/public/burger.svg';
import Logo from '@/public/logo.svg';

const Header = () => {
  const breakpoint = useWindowSize();

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
          'sm:bg-bottom',
          'bg-right',
          'bg-no-repeat',
          'border-b',
          'border-solid',
          'border-white',
        )}
      >
        <Link href="/">
          <Image
            alt="logo"
            src={Logo}
            className={clsx('lg:w-[220px]', 'md:w-[200px]', 'sm:w-[180px]', 'w-[120px]')}
          />
        </Link>
        {!(breakpoint >= WindowWidth.SM) && (
          <button
            className={clsx('flex', 'justify-center', 'items-center', 'hover:cursor-pointer')}
          >
            <Image
              src={Burger}
              alt="burger"
              className={clsx('transition-transform', 'active:scale-90')}
            />
          </button>
        )}
      </header>
      {breakpoint >= WindowWidth.SM && <Navigation />}
    </>
  );
};

export default Header;
