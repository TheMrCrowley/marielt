import clsx from 'clsx';
import React from 'react';

import BackButton from '@/src/components/common/BackButton';
import Typography from '@/src/components/common/Typography';
import { AppRoutes } from '@/src/enums/AppRoutes';

import AgentTest from './AgentTest';
import PageForm from './PageForm';

const WelcomeSection = () => {
  return (
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
        'md:min-h-[750px]',
        'min-h-[500px]',
        'gap-8',
        'bg-[url(/agent-bg.jpg)]',
      )}
    >
      <BackButton
        to={AppRoutes.Careers}
        className="absolute z-10 sm:left-4 sm:top-4 top-0 left-3"
      />
      <div className={clsx('max-w-7xl', 'w-full', 'flex', 'items-center', 'px-5')}>
        <div className={clsx('max-w-3xl', 'flex', 'gap-8', 'flex-col')}>
          <Typography fontSize={48}>Кто такой - агент по операциям с недвижимостью?</Typography>
          <Typography fontWeight="light" fontSize={20}>
            Агент - надежный гид в мире недвижимости. Он приносит множество преимуществ как при
            продаже, так и при покупке квартиры.
          </Typography>
          <AgentTest />
        </div>
      </div>
      <PageForm />
    </section>
  );
};

export default WelcomeSection;
