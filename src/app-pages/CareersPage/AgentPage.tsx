import clsx from 'clsx';
import React from 'react';

import Typography from '@/src/components/common/Typography';

const AgentPage = () => {
  return (
    <div className={clsx('w-full')}>
      <div
        className={clsx(
          'w-full',
          'bg-center',
          'bg-cover',
          'bg-no-repeat',
          'flex',
          'justify-center',
          'items-center',
          'md:min-h-[750px]',
          'min-h-[500px]',
          'bg-[url(/agent-bg.jpg)]',
        )}
      >
        <div className={clsx('max-w-7xl', 'w-full', 'flex', 'items-center', 'px-5')}>
          <div className={clsx('max-w-3xl', 'flex', 'gap-8', 'flex-col')}>
            <Typography fontSize={48}>Кто такой - агент по операциям с недвижимостью?</Typography>
            <Typography fontWeight="light" fontSize={20}>
              Агент - надежный гид в мире недвижимости. Он приносит множество преимуществ как при
              продаже, так и при покупке квартиры.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPage;
