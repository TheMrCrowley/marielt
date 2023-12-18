import clsx from 'clsx';
import React from 'react';

import BackButton from '@/src/components/common/BackButton';
import Title from '@/src/components/common/Title';
import { AppRoutes } from '@/src/enums/AppRoutes';

import DocLinkList, { DocLinkListProps } from './DocLinkList';

const constituentDocuments: DocLinkListProps = {
  items: [
    {
      href: '/licenziya-1.pdf',
      icon: 'private',
      title: 'Лицензия АН «Группа компаний Мариэлт»',
    },
    {
      href: '/svidetelstvo-1.pdf',
      icon: 'private',
      title: 'Свидетельство о государственной регистрации АН «Группа компаний Мариэлт»',
    },
    {
      href: '/strahovoi_8.pdf',
      icon: 'private',
      title: 'Страховой полис АН «Группа компаний Мариэлт»',
    },
  ],
  title: 'Учредительные документы',
};

const realtorCertificationCertificate: DocLinkListProps = {
  title: 'Свидетельство об аттестации риэлтера',
  items: [
    {
      href: '/shirochina-2.pdf',
      icon: 'private',
      title: 'Широчина Мария Николаевна',
    },
    {
      href: '/Svid-moroz-1.pdf',
      icon: 'private',
      title: 'Мороз Константину Владимировичу',
    },
    {
      href: '/savelieva-1.pdf',
      icon: 'private',
      title: 'Савельевой Ирине Сергеевне',
    },
    {
      href: '/safrankova-1.pdf',
      icon: 'private',
      title: 'Сафранковой Ольге Викторовне',
    },
    {
      href: '/belyavskaya-4.pdf',
      icon: 'private',
      title: 'Белявская Ирина Анатольевна',
    },
    {
      href: '/klimovich.pdf',
      icon: 'private',
      title: 'Климович Татьяне Федоровне',
    },
    {
      href: '/plyanta.pdf',
      icon: 'private',
      title: 'Плянта Дмитрию Ивановичу',
    },
    {
      href: '/lazarenko.pdf',
      icon: 'private',
      title: 'Лазаренковой Ольге Валерьевне',
    },
    {
      href: '/homenkova.pdf',
      icon: 'private',
      title: 'Хоменковой Дарье Сергеевне',
    },
    {
      href: '/novik-1.pdf',
      icon: 'private',
      title: 'Новик Светлана Игоревна',
    },
    {
      href: '/popinan.pdf',
      icon: 'private',
      title: 'Попиначенко Андрею Викторовичу',
    },
  ],
};

const agreements: DocLinkListProps = {
  title: 'Договор',
  items: [
    {
      href: '/dogovor_pokup-2.pdf',
      icon: 'pdf',
      title: 'Договор на оказание риэлтерских услуг покупателю объекта недвижимости',
    },
    {
      href: '/dogovor_prod-2.pdf',
      icon: 'pdf',
      title: 'Договор на оказание риэлтерских услуг продавцу объекта недвижимости',
    },
  ],
};

const regulations: DocLinkListProps = {
  title: 'Нормативные документы',
  items: [
    {
      icon: 'pdf',
      title:
        'Указ Президента Республики Беларусь N 15 от 9 января 2006 г. о риэлтерской деятельности в Республике Беларусь',
      href: '/ukaz-09-01-2006.pdf',
    },
    {
      icon: 'pdf',
      title:
        'Постановление Совета Министров Республики Беларусь N 386 от 14 марта 2008 г. о некоторых мерах по реализации Указа Президента Республики Беларусь от 28 ФЕВРАЛЯ 2008 Г. N 140',
      href: '/postanovlenie-14-03-2008.pdf',
    },
    {
      icon: 'pdf',
      title:
        'Постановление Министерства Юстиции Республики Беларусь N 42 от 1 июня 2009 г. о некоторых мерах по совершенствованию риэлтерской деятельности в Республике Беларусь',
      href: '/postanovlenie-1-09.pdf',
    },
  ],
};

const DocsPage = () => {
  return (
    <>
      <section
        className={clsx(
          'relative',
          'w-full',
          'bg-center',
          'bg-cover',
          'bg-no-repeat',
          'flex',
          'sm:flex-row',
          'flex-col',
          'justify-center',
          'items-center',
          'min-h-[500px]',
          'gap-8',
          'bg-[url(/docs-bg.jpg)]',
        )}
      >
        <BackButton
          to={AppRoutes.About}
          className="absolute z-10 sm:left-4 sm:top-4 top-0 left-3"
        />
        <div className={clsx('max-w-7xl', 'w-full', 'flex', 'items-center', 'px-5')}>
          <Title fontSize={48}>Все прозрачно - нам нечего скрывать</Title>
        </div>
      </section>
      <section className="w-full flex p-6 justify-center items-center flex-col gap-12">
        <DocLinkList {...constituentDocuments} />
        <DocLinkList {...realtorCertificationCertificate} />
        <DocLinkList {...agreements} />
        <DocLinkList {...regulations} />
      </section>
    </>
  );
};

export default DocsPage;
