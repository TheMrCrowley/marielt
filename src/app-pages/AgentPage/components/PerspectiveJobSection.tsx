import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import CalendarIcon from '@/public/CalendarDate.svg';
import CashIcon from '@/public/CashCoin.svg';
import InfinityIcon from '@/public/Infinity.svg';
import MortarboardIcon from '@/public/Mortarboard.svg';
import PlanetIcon from '@/public/planet.svg';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';

const PerspectiveJobSection = () => {
  return (
    <section
      className={clsx(
        'w-full',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'gap-8',
        'p-6',
      )}
    >
      <div className={clsx('max-w-7xl', 'w-full', 'flex', 'flex-col', 'gap-4')}>
        <Title fontSize={48} fontWeight="medium">
          Почему работа агента - это перспективная работа?
        </Title>
        <Typography fontSize={24} fontWeight="light">
          Работа агента по недвижимости - это ключ к успешной и процветающей карьере.{' '}
        </Typography>
      </div>
      <div
        className={clsx(
          'flex',
          'max-w-[1620px]',
          'w-full',
          'flex-col',
          'divide-y-[1px]',
          'gap-4',
          'divide-secondary',
          'justify-center',
          'items-center',
        )}
      >
        <div className="w-full flex justify-center items-center border-t border-secondary py-6">
          <div className={clsx('max-w-7xl', 'w-full', 'grid', 'md:grid-cols-2', 'gap-4')}>
            <div className={clsx('flex', 'sm:gap-8', 'gap-4', 'items-center', 'h-max')}>
              <Image alt="" src={CashIcon} />
              <Typography color="text-secondary">Высокие доходы</Typography>
            </div>
            <Typography>
              Агенты по недвижимости могут наслаждаться значительными доходами сопоставимыми с
              опытными IT-специалистами.
            </Typography>
          </div>
        </div>
        <div className="w-full flex justify-center items-center py-6">
          <div className={clsx('max-w-7xl', 'w-full', 'grid', 'sm:grid-cols-2', 'gap-4')}>
            <div className={clsx('flex', 'sm:gap-8', 'gap-4', 'items-center', 'h-max')}>
              <Image alt="" src={CalendarIcon} />
              <Typography color="text-secondary">Гибкий график</Typography>
            </div>
            <Typography fontSize={20} fontWeight="light">
              Гибкий график: Власть над своим графиком - в ваших руках. Работа агента по
              недвижимости предоставляет уникальную свободу управления временем, что позволяет легко
              совмещать работу с личными обязанностями. Это особенно ценно для тех, кто хочет жить
              полной жизнью.
            </Typography>
          </div>
        </div>
        <div className="w-full flex justify-center items-center py-6">
          <div className={clsx('max-w-7xl', 'w-full', 'grid', 'sm:grid-cols-2', 'gap-4')}>
            <div className={clsx('flex', 'sm:gap-8', 'gap-4', 'items-center', 'h-max')}>
              <Image alt="" src={MortarboardIcon} />
              <Typography color="text-secondary">Развитие навыков и экспертиза</Typography>
            </div>
            <Typography fontSize={20} fontWeight="light">
              Знание - это ключ к успеху. Работа в недвижимости требует усвоения знаний о рынке,
              юридических аспектах и маркетинге. Здесь вы будете постоянно развивать свои навыки,
              что позволит вам стать экспертом в своей области.
            </Typography>
          </div>
        </div>
        <div className="w-full flex justify-center items-center py-6">
          <div className={clsx('max-w-7xl', 'w-full', 'grid', 'sm:grid-cols-2', 'gap-4')}>
            <div className={clsx('flex', 'sm:gap-8', 'gap-4', 'items-center', 'h-max')}>
              <Image alt="" src={InfinityIcon} />
              <Typography color="text-secondary">Бесконечные перспективы</Typography>
            </div>
            <Typography fontSize={20} fontWeight="light">
              Недвижимость всегда востребована, и перспективы в этой сфере остаются стабильными. С
              развитием Минска и ростом городов спутников, работа агента по недвижимости остается
              актуальной и выгодной.
            </Typography>
          </div>
        </div>
        <div className="w-full flex justify-center items-center !border-b border-secondary py-6">
          <div className={clsx('max-w-7xl', 'w-full', 'grid', 'sm:grid-cols-2', 'gap-4')}>
            <div className={clsx('flex', 'sm:gap-8', 'gap-4', 'items-center', 'h-max')}>
              <Image alt="" src={PlanetIcon} />
              <Typography color="text-secondary">Мировые горизонты</Typography>
            </div>
            <div className={clsx()}>
              <Typography fontSize={20} fontWeight="light">
                Мечта о работе на мировом рынке недвижимости может стать реальностью. Некоторые
                агенты переносят свой опыт на международную арену, что предоставляет возможность
                путешествовать и работать с разнообразными клиентами - MARIELT REAL ESTATE DUBAI
                ждет вас!
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerspectiveJobSection;
