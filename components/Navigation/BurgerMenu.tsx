'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import Burger from '@/public/burger.svg';

const BurgerMenu = () => {
  return (
    <button
      className={clsx(
        'flex',
        'sm:hidden',
        'justify-center',
        'items-center',
        'hover:cursor-pointer',
      )}
    >
      <Image
        src={Burger}
        alt="burger"
        className={clsx('transition-transform', 'active:scale-90')}
      />
    </button>
  );
};

export default BurgerMenu;
