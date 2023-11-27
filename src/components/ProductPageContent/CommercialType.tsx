import clsx from 'clsx';

import Typography from '@/src/components/common/Typography';

const CommercialType = () => {
  return (
    <div className={clsx('flex', 'items-start')}>
      <div className={clsx('flex', 'flex-col', 'border-r', 'border-[#ffffff1a]', 'pr-6')}>
        <Typography color="text-[#A3A3A3]" fontSize={14}>
          Тип
        </Typography>
        <Typography fontSize={14}>Склады</Typography>
      </div>
      <div className={clsx('flex', 'flex-col', 'pl-6')}>
        <Typography color="text-[#A3A3A3]" fontSize={14}>
          Вид
        </Typography>
        <Typography fontSize={14}>Склад+Офис</Typography>
      </div>
    </div>
  );
};

export default CommercialType;
