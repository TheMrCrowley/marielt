import clsx from 'clsx';
import Image from 'next/image';
import Markdown from 'react-markdown';

import ImageCommaRev from '@/public/comma-reverse.svg';
import ImageComma from '@/public/comma.svg';
import Title from '@/src/components/common/Title/Title';

const DescriptionField = ({ description }: { description?: string }) => {
  if (!description) {
    return null;
  }

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
      <section className={'text-white'}>
        <Markdown>{description}</Markdown>
      </section>
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
