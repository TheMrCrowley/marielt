'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import FacebookIcon from '@/public/facebook-icon.svg';
import RatingImg from '@/public/footer_rating.png';
import InstagramIcon from '@/public/instagram.svg';
import Logo from '@/public/logo.svg';
import OkIcon from '@/public/ok-icon.svg';
import WeOnRealtImg from '@/public/realt.png';
import VkIcon from '@/public/vk-icon.svg';
import ContactItem from '@/src/components/common/ContactItem';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { AppRoutes } from '@/src/enums/AppRoutes';
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
          <div className={clsx('flex', 'flex-col', 'md:max-w-sm', 'gap-6')}>
            <Image
              src={Logo}
              alt="logo"
              className={clsx('sm:max-w-[200px]', 'max-w-[140px]', 'h-auto', 'object-contain')}
            />
            <div className="flex flex-col gap-2">
              <Typography fontSize={16}>
                © {new Date().getFullYear()} «Группа Компаний Мариэлт»
              </Typography>
              <Typography fontSize={16}>УНП: 193601325</Typography>
              <Typography fontSize={16}>Лицензия: 02240/431, МЮ РБ</Typography>
            </div>
            <div className={clsx('flex', 'flex-col', 'gap-6', 'opacity-50', 'mb-4')}>
              <Typography fontSize={16}>
                Использование портала означает согласие с{' '}
                <Link
                  href={'/Пользовательское соглашение.docx'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-secondary"
                >
                  Пользовательское соглашение
                </Link>
                <br />
                <Link
                  href={'/Политика_обработки_персональных_данных_.docx'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-secondary"
                >
                  Политика обработки персональных данных
                </Link>
              </Typography>
            </div>
            <div className={clsx('flex', 'flex-col', 'gap-6', 'opacity-50', 'mb-4')}>
              <Typography fontSize={16}>
                Юридические{' '}
                <Link href={AppRoutes.Docs} className="underline text-secondary">
                  документы
                </Link>
                , на основании которых работает компания
              </Typography>
            </div>
          </div>
          <div className={clsx('flex', 'flex-col', 'min-w-max', 'gap-6')}>
            <Title variant="h2" fontSize={36} fontWeight="medium">
              Контакты
            </Title>
            <ul className={clsx('flex', 'flex-col', 'gap-4')}>
              <ContactItem type="phone">+375 17 322 73 22</ContactItem>
              <ContactItem type="phone">+375 29 710 20 20</ContactItem>
              <ContactItem type="email">office@marielt.by</ContactItem>
            </ul>
            <Title variant="h2" fontSize={20} fontWeight="medium">
              Отдел коммерческой недвижимости:
            </Title>
            <ul className={clsx('flex', 'flex-col', 'gap-4')}>
              <ContactItem type="phone">+375 33 380-85-85</ContactItem>
              <ContactItem type="phone">+375 29 380-85-85</ContactItem>
            </ul>
          </div>
          <div className={clsx('flex', 'flex-col', 'gap-6')}>
            <Title variant="h2" fontSize={36} fontWeight="medium">
              Адрес
            </Title>
            <ul className={clsx('flex', 'flex-col', 'gap-4')}>
              <ContactItem type="address" iconClassName="self-center">
                ул. Кальварийская 42, оф. 68, <br /> ст. м. Молодёжная
              </ContactItem>
              <Typography>Время работы:</Typography>
              <ContactItem type="clock">пн - пт с 9:00 до 21:00</ContactItem>
              <ContactItem type="clock">сб - вс с 9.00 до 15.00</ContactItem>
            </ul>
          </div>
        </div>
      </div>
      <div className={clsx('w-full', 'h-[1px]', 'bg-[#ffffff80]')}></div>
      <div className="container">
        <div
          className={clsx(
            'flex',
            'py-4',
            'w-full',
            'justify-between',
            'items-center',
            'gap-8',
            'flex-wrap',
          )}
        >
          <div className={clsx('flex', 'justify-center', 'gap-2')}>
            <Link
              href="https://realt.by/agencies/rating/"
              target="_blank"
              rel="noopener noreferrer"
              prefetch
            >
              <Image src={RatingImg} alt="rating-realt" />
            </Link>
            <Link
              href="https://realt.by/agencies/gruppa-kompanii-mariehlt/"
              target="_blank"
              rel="noopener noreferrer"
              prefetch
            >
              <Image src={WeOnRealtImg} alt="we-on-realt" />
            </Link>
          </div>
          <div className={clsx('flex', 'gap-6', 'items-center')}>
            <a
              href="https://instagram.com/marielt_an?igshid=NzZlODBkYWE4Ng=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={InstagramIcon} alt="instagram" />
            </a>
            <a href="https://vk.com/club223330939" target="_blank" rel="noopener noreferrer">
              <Image src={VkIcon} alt="instagram" />
            </a>
            <a href="https://ok.ru/group/70000004512862" target="_blank" rel="noopener noreferrer">
              <Image src={OkIcon} alt="instagram" />
            </a>
            <a
              href="https://www.facebook.com/marielt.agency"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={FacebookIcon} alt="instagram" />
            </a>
          </div>
          <Typography fontSize={16}>VUCA - digital studio © {new Date().getFullYear()}</Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
