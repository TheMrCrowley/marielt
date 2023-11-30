import clsx from 'clsx';

import Title from '@/src/components/common/Title/Title';
import Typography from '@/src/components/common/Typography';

const AreaField = () => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'lg:gap-y-[38px]',
        'gap-y-5',
        'lg:px-8',
        'px-4',
        'py-5',
        'lg:border-r',
        'border-[#ffffff1a]',
        'lg:border-t-0',
        'border-t',
        'border-[#ffffff1a]',
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
        )}
      >
        <div
          className={clsx('flex', 'flex-col', 'lg:px-8', 'border-r', 'border-[#ffffff1a]', 'px-4')}
        >
          <Typography>
            38,5
            <span className={clsx('text-[#B1B1B1]')}>
              м<sup>2</sup>
            </span>
          </Typography>
          <Typography fontSize={16} fontWeight={'light'}>
            общая
          </Typography>
        </div>
        <div
          className={clsx('flex', 'flex-col', 'lg:px-8', 'px-4', 'border-r', 'border-[#ffffff1a]')}
        >
          <Typography>
            23,5
            <span className={clsx('text-[#B1B1B1]')}>
              м<sup>2</sup>
            </span>
          </Typography>
          <Typography fontSize={16} fontWeight={'light'}>
            жилая
          </Typography>
        </div>
        <div className={clsx('flex', 'flex-col', 'lg:px-8', 'px-5')}>
          <Typography>14,7$</Typography>
          <Typography fontSize={16} fontWeight={'light'}>
            за{' '}
            <span>
              м<sup>2</sup>
            </span>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AreaField;
