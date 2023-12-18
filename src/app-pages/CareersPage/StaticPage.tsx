import clsx from 'clsx';
import { StaticImageData } from 'next/image';
import { PropsWithChildren } from 'react';

import BackButton from '@/src/components/common/BackButton';
import Typography from '@/src/components/common/Typography/Typography';
import { AppRoutes } from '@/src/enums/AppRoutes';

type StaticPageProps = {
  imageUrl: StaticImageData;
  title: string;
  description: string;
};

const StaticPage = ({
  description,
  imageUrl,
  title,
  children,
}: PropsWithChildren<StaticPageProps>) => {
  return (
    <div className={clsx('flex', 'flex-col', 'w-full', 'justify-center', 'items-center')}>
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
          'relative',
        )}
        style={{
          backgroundImage: `url(${imageUrl.src})`,
        }}
      >
        <BackButton
          to={AppRoutes.Careers}
          className="absolute z-10 sm:left-4 sm:top-4 top-0 left-3"
        />
        <div className={clsx('max-w-7xl', 'w-full', 'flex', 'items-center', 'px-5')}>
          <div className={clsx('max-w-2xl', 'flex', 'gap-8', 'flex-col')}>
            <Typography fontSize={48}>{title}</Typography>
            <Typography fontWeight="light" fontSize={20}>
              {description}
            </Typography>
          </div>
        </div>
      </div>
      <div className={clsx('max-w-7xl', 'w-full', 'flex', 'items-center', 'py-12', 'px-4')}>
        <div className={clsx('max-w-5xl', 'flex', 'gap-8', 'flex-col')}>{children}</div>
      </div>
    </div>
  );
};

export default StaticPage;
