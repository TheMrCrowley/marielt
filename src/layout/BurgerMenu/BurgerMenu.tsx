'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import Burger from '@/public/burger.svg';
import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';

const BurgerMenu = () => {
  const breakpoint = useWindowSize();

  if (breakpoint >= WindowWidth.SM) {
    return null;
  }

  return (
    <>
      <button className={clsx('flex', 'justify-center', 'items-center', 'hover:cursor-pointer')}>
        <Image
          src={Burger}
          alt="burger"
          className={clsx('transition-transform', 'active:scale-90')}
        />
      </button>
    </>
  );
};

export default BurgerMenu;
