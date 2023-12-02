import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import Title from '@/src/components/common/Title/Title';

const AreaField = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'lg:gap-0',
        'gap-5',
        'lg:px-8',
        'px-4',
        'py-5',
        'lg:border-r',
        'border-[#ffffff1a]',
        'lg:border-t-0',
        'border-t',
        'border-[#ffffff1a]',
        'basis-1/3',
      )}
    >
      <Title variant="h2" fontSize={24} fontWeight={'medium'}>
        Площадь
      </Title>
      <div
        className={clsx(
          'flex',
          'lg:justify-center',
          'xs:justify-start',
          'justify-center',
          'items-center',
          'my-auto',
          'px-4',
          'gap-6',
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default AreaField;
