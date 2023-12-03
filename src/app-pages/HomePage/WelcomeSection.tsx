import clsx from 'clsx';
import React from 'react';

import ApplicationField from '@/src/components/ApplicationField';
import { HomePageData } from '@/src/types/HomePage';

interface WelcomeSectionProps {
  data: HomePageData['welcomeSection'];
}

const WelcomeSection = ({ data: { description, image, title } }: WelcomeSectionProps) => {
  return (
    <section
      className={clsx(
        'w-full',
        'bg-center',
        'bg-cover',
        'bg-no-repeat',
        'md:min-h-[750px]',
        'min-h-[600px]',
        'flex',
        'md:flex-row',
        'flex-col',
        'justify-between',
        'items-stretch',
        'gap-4',
      )}
      style={{ backgroundImage: `url(${image.url})` }}
    >
      <div
        className={clsx(
          'lg:py-14',
          'md:py-10',
          'py-8',
          'md:px-10',
          'px-8',
          'backdrop-blur-sm',
          'bg-[#00000080]',
          'flex',
          'flex-col',
          'gap-4',
          'md:self-center',
          'self-start',
          'max-w-max',
        )}
      >
        <h1
          className={clsx(
            'xl:text-4xl',
            'lg:text-3xl',
            'md:text-2xl',
            'text-xl',
            'font-medium',
            'text-secondary',
            'uppercase',
          )}
        >
          {title}
        </h1>
        <p className={clsx('text-white', 'lg:text-2xl', 'sm:text-xl', 'text-base')}>
          {description}
        </p>
      </div>
      <ApplicationField type="home" />
    </section>
  );
};

export default WelcomeSection;
