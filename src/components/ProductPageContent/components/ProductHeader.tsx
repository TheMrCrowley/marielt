import clsx from 'clsx';
import { FC } from 'react';

import Title from '@/src/components/common/Title/Title';

interface Props {
  description?: React.ReactNode | React.ReactElement;
  price?: React.ReactNode | React.ReactElement;
  area?: React.ReactNode | React.ReactElement;
}

const ProductHeader: FC<Props> = ({ area, description, price }) => {
  return (
    <div className={clsx('bg-[#262626]', 'flex', 'lg:flex-row', 'flex-col')}>
      <div
        className={clsx(
          'flex',
          'flex-col',
          'lg:gap-y-5',
          'gap-y-4',
          'lg:px-8',
          'px-5',
          'py-5',
          'border-r',
          'border-[#ffffff1a]',
        )}
      >
        {description}
      </div>
      {area}
      <div
        className={clsx(
          'flex',
          'flex-col',
          'lg:gap-0',
          'gap-5',
          'lg:px-8',
          'py-5',
          'px-5',
          'lg:border-0',
          'border-t',
          'border-[#ffffff1a]',
          'flex-auto',
        )}
      >
        <Title variant="h2" fontSize={24} fontWeight={'medium'}>
          Стоимость
        </Title>
        {price}
      </div>
    </div>
  );
};

export default ProductHeader;
