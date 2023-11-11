import clsx from 'clsx';
import React from 'react';

import { getWelcomeSectionItem } from '@/src/services/homePageServices';

const WelcomeSection = async () => {
  const { description, image, title } = await getWelcomeSectionItem();

  return (
    <section
      className={clsx(
        'w-full',
        'bg-center',
        'bg-cover',
        'bg-no-repeat',
        'md:min-h-[750px]',
        'min-h-[600px]',
      )}
      style={{ backgroundImage: `url(${image.src})` }}
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
          'gap-y-3',
          'lg:mt-44',
          'md:mt-24',
          'sm:mt-12',
          'mt-6',
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
      {/*TODO //place for form */}
    </section>
  );
};

export default WelcomeSection;
