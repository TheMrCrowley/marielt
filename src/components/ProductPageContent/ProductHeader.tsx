import clsx from 'clsx';
import { FC } from 'react';

import Title from '@/src/components/common/Title/Title';

/* <div
          className={clsx(
            'flex',
            'lg:justify-center',
            'justify-start',
            'items-center',
            'flex-wrap',
            'lg:gap-3',
            'gap-2',
          )}
        >
          <Typography
            fontSize={24}
            fontWeight="medium"
            color="text-[#343434]"
            className={clsx('bg-secondary', 'lg:px-6', 'lg:py-3', 'px-4', 'py-2', 'w-max')}
          >
            67 0246 USD
          </Typography>
          <Typography fontSize={24}>198 623 BYN</Typography>
        </div>
        <div
          className={clsx(
            'flex',
            'lg:justify-center',
            'justify-start',
            'items-center',
            'flex-wrap',
            'lg:gap-16',
            'gap-2',
          )}
        >
          <Typography color="text-[#E3C496]" fontSize={20} fontWeight="medium">
            1 650 $ за{' '}
            <span>
              м<sup>2</sup>
            </span>
          </Typography>
          <Typography color="text-[#B1B1B1]" fontSize={20} fontWeight="medium">
            4 240 BYN за{' '}
            <span>
              м<sup>2</sup>
            </span>
          </Typography>
        </div> */

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
