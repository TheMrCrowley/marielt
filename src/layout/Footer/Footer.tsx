'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import RatingImg from '@/public/footer_rating.png';
import InstagramIcon from '@/public/instagram.svg';
import Logo from '@/public/logo.svg';
import WeOnRealtImg from '@/public/realt.png';
import TelegramIcon from '@/public/telegram.svg';
import ContactItem from '@/src/components/common/ContactItem';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { useViewType } from '@/src/hooks/useViewType';

const Footer = () => {
  const viewType = useViewType();

  if (viewType === 'map') {
    return null;
  }

  return (
    <footer
      className={clsx(
        'flex',
        'flex-col',
        'bg-no-repeat',
        'bg-cover',
        'bg-center',
        'bg-[url(/footer_bg.png)]',
      )}
    >
      <div className="container">
        <div
          className={clsx(
            'md:py-16',
            'py-8',
            'flex',
            'w-full',
            'justify-between',
            'gap-8',
            'flex-wrap',
          )}
        >
          <div className={clsx('flex', 'flex-col', 'md:max-w-[30%]')}>
            <Image
              src={Logo}
              alt="logo"
              className={clsx(
                'sm:max-w-[200px]',
                'max-w-[140px]',
                'h-auto',
                'object-contain',
                'xl:mb-16',
                'mb-8',
              )}
            />
            <div className={clsx('flex', 'flex-col', 'gap-6', 'opacity-50')}>
              <Typography fontSize={16}>
                Lorem ipsum dolor sit amet consectetur. Semper lacinia laoreet magna imperdiet eu
              </Typography>
              <Typography fontSize={16}>
                nullam et aliquet magnis. Nulla pellentesque cras suspendisse felis purus nunc nisl
                placerat.
              </Typography>
              <Typography fontSize={16}>
                Aenean tempus morbi et ipsum. Sed dictum a sagittis orci
              </Typography>
            </div>
          </div>
          <div className={clsx('flex', 'flex-col', 'min-w-max')}>
            <Title variant="h2" fontSize={36} fontWeight="medium" className="xl:mb-12 mb-8">
              Контакты
            </Title>
            <ul className={clsx('flex', 'flex-col', 'gap-4', 'mb-11')}>
              <ContactItem type="phone">+375 17 322 73 22</ContactItem>
              <ContactItem type="phone">+375 29 710 20 20</ContactItem>
              <ContactItem type="email">office@marielt.by</ContactItem>
            </ul>
            <div className={clsx('flex', 'gap-6', 'items-center')}>
              <a
                href="https://www.instagram.com/marielt_an/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={InstagramIcon} alt="instagram" />
              </a>
              {/* TODO add link to telegram */}
              <a href="" target="_blank" rel="noopener noreferrer">
                <Image src={TelegramIcon} alt="telegram" />
              </a>
            </div>
          </div>
          <div className={clsx('flex', 'flex-col')}>
            <Title variant="h2" fontSize={36} fontWeight="medium" className="xl:mb-12 mb-8">
              Адрес
            </Title>
            <ul className={clsx('flex', 'flex-col', 'gap-4')}>
              <ContactItem type="address">
                ул. Кальварийская 42, оф. 72 ст. м .Молодёжная
              </ContactItem>
              <ContactItem type="clock">Время работы: с 9:00 до 21:00</ContactItem>
            </ul>
          </div>
        </div>
      </div>
      <div className={clsx('w-full', 'h-[1px]', 'bg-[#ffffff80]')}></div>
      <div className="container">
        <div
          className={clsx(
            'flex',
            'py-8',
            'w-full',
            'justify-between',
            'items-center',
            'gap-8',
            'flex-wrap',
          )}
        >
          <Typography fontSize={16}>© 2019 «ГРУППА КОМПАНИЙ Мариэлт»</Typography>
          <div className={clsx('flex', 'justify-center', 'gap-2')}>
            <Link
              href="https://realt.by/agencies/rating/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={RatingImg} alt="rating-realt" />
            </Link>
            <Link
              href="https://realt.by/agencies/gruppa-kompanii-mariehlt/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={WeOnRealtImg} alt="we-on-realt" />
            </Link>
          </div>
          <Typography fontSize={16}>VUCA - digital studio © {new Date().getFullYear()}</Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
