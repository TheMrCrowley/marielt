import clsx from 'clsx';
import Image from 'next/image';

import ImageCommaRev from '@/public/comma-reverse.svg';
import ImageComma from '@/public/comma.svg';
import Title from '@/src/components/common/Title/Title';
import Typography from '@/src/components/common/Typography/Typography';

const DescriptionField = ({ description }: { description: string }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'bg-[#262626]', 'px-24', 'py-10', 'relative')}>
      <Image
        alt="comma-rev"
        src={ImageCommaRev}
        className={clsx('absolute', 'block', 'top-[30px]', 'left-[30px]')}
      />

      <Title className={clsx('pb-3')} fontSize={32}>
        Описание
      </Title>
      <Typography fontSize={16} fontWeight="light" className={clsx('leading-6')}>
        {description}
      </Typography>
      <Image
        alt="comma"
        src={ImageComma}
        className={clsx('absolute', 'block', 'bottom-[30px]', 'right-[30px]')}
      />
    </div>
  );
};

export default DescriptionField;
