'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import BurgerClose from '@/public/burger-close.svg';
import Burger from '@/public/burger.svg';
import RatingImg from '@/public/footer_rating.png';
import WeOnRealtImg from '@/public/realt.png';
import ContactItem from '@/src/components/common/ContactItem';
import Portal from '@/src/components/common/Portal';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { AppRoutes } from '@/src/enums/AppRoutes';
import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import NavigationItem from '@/src/layout/Navigation/NavigationItem';

interface BurgerMenuProps {
  navigationItems: Array<{
    title: string;
    to: AppRoutes;
  }>;
}

const BurgerMenu = ({ navigationItems }: BurgerMenuProps) => {
  const breakpoint = useWindowSize();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (breakpoint > WindowWidth.SM && isOpen) {
      setIsOpen(false);
    }
  }, [breakpoint]);

  return (
    <>
      <button
        className={clsx('flex', 'justify-center', 'items-center', 'hover:cursor-pointer')}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={isOpen ? BurgerClose : Burger}
          alt="burger"
          className={clsx('transition-transform', 'active:scale-90')}
        />
      </button>
      {isOpen && (
        <Portal>
          <div
            className={clsx(
              'fixed',
              'xl:top-36',
              'lg:top-28',
              'md:top-20',

              'top-16',
              'left-0',
              'right-0',
              'bottom-0',
              'lg:p-9',
              'md:p-4',
              'p-0',
              'box-border',
              'z-50',
              'flex',
              'flex-col',
              'gap-5',
              'bg-[#3D3D3D]',
              'backdrop-blur-sm',
              'overflow-y-auto',
              'scrollbar-thin',
              'scrollbar-thumb-primary',
              'scrollbar-track-secondary',
            )}
            role="dialog"
          >
            <nav className={clsx('flex', 'w-full')}>
              <ul className={clsx('max-w-6xl', 'w-full', 'flex', 'flex-col')}>
                {navigationItems.map((navItem) => (
                  <div
                    key={navItem.title}
                    className={clsx(
                      'w-full',
                      'border-b',
                      'border-solid',
                      'border-[#545454]',
                      'flex',
                      'justify-start',
                      'px-5',
                    )}
                  >
                    <NavigationItem
                      onClick={() => setIsOpen(false)}
                      navItem={{
                        title: navItem.title,
                        href: navItem.to,
                      }}
                      key={navItem.title}
                      className="w-full"
                    />
                  </div>
                ))}
              </ul>
            </nav>
            <div
              className={clsx('flex', 'flex-col', 'flex-auto', 'justify-between', 'px-5', 'gap-4')}
            >
              <Title variant="h2" fontSize={14} className="opacity-50">
                Контакты
              </Title>
              <ul className={clsx('flex', 'flex-col', 'gap-4')}>
                <ContactItem type="phone">+375 17 322 73 22</ContactItem>
                <ContactItem type="phone">+375 29 710 20 20</ContactItem>
                <ContactItem type="email">office@marielt.by</ContactItem>
              </ul>
              <Title variant="h2" fontSize={14} className="opacity-50">
                Адрес
              </Title>
              <ul className={clsx('flex', 'flex-col', 'gap-4')}>
                <ContactItem type="address">
                  ул. Кальварийская 42, оф. 72 ст. м .Молодёжная
                </ContactItem>
                <ContactItem type="clock">Время работы: с 9:00 до 21:00</ContactItem>
              </ul>
              <div className={clsx('flex', 'gap-2')}>
                <Image src={RatingImg} alt="rating-realt" />
                <Image src={WeOnRealtImg} alt="we-on-realt" />
              </div>
              <Typography fontSize={14} className="opacity-50">
                © 2019 «ГРУППА КОМПАНИЙ Мариэлт»
              </Typography>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default BurgerMenu;
