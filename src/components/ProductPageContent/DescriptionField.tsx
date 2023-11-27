import clsx from 'clsx';
import Image from 'next/image';

import ImageCommaRev from '@/public/comma-reverse.svg';
import ImageComma from '@/public/comma.svg';
import Title from '@/src/components/common/Title/Title';
import Typography from '@/src/components/common/Typography/Typography';

const DescriptionField = ({ description }: { description: string }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'bg-[#262626]',
        'px-5',
        'xl:px-24',
        'lg:px-12',
        'py-10',
        'relative',
      )}
    >
      <Image
        alt="comma-rev"
        src={ImageCommaRev}
        className={clsx('absolute', 'block', 'md:top-[30px]', 'md:left-[30px]', 'top-5', 'left-5')}
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
        className={clsx(
          'absolute',
          'block',
          'md:bottom-[30px]',
          'md:right-[30px]',
          'bottom-5',
          'right-5',
        )}
      />
    </div>
  );
};

export default DescriptionField;
