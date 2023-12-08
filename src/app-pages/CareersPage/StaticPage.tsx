import clsx from 'clsx';
import { StaticImageData } from 'next/image';

import Typography from '@/src/components/common/Typography/Typography';

interface StaticPageProps {
  imageUrl: StaticImageData;
  title: string;
  description: string;
}

const StaticPage = ({ description, imageUrl, title }: StaticPageProps) => {
  return (
    <div className={clsx('flex', 'flex-col', 'w-full', 'justify-center', 'items-center')}>
      <div
        className={clsx(
          'w-full',
          'bg-center',
          'bg-cover',
          'bg-no-repeat',
          'flex',
          'justify-center',
          'items-center',
          'md:min-h-[750px]',
          'min-h-[500px]',
        )}
        style={{
          backgroundImage: `url(${imageUrl.src})`,
        }}
      >
        <div className={clsx('max-w-7xl', 'w-full', 'flex', 'items-center', 'px-5')}>
          <div className={clsx('max-w-2xl', 'flex', 'gap-8', 'flex-col')}>
            <Typography fontSize={48}>{title}</Typography>
            <Typography fontWeight="light" fontSize={20}>
              {description}
            </Typography>
          </div>
        </div>
      </div>
      <div className={clsx('max-w-7xl', 'w-full', 'flex', 'items-center', 'py-12', 'px-4')}>
        <div className={clsx('max-w-5xl', 'flex', 'gap-8', 'flex-col')}>
          <Typography fontSize={48}>Lorem ipsum dolor sit amet consectetur.</Typography>
          <Typography fontWeight="light" fontSize={20}>
            Lorem ipsum dolor sit amet consectetur. Consectetur vestibulum consequat morbi leo at.
            Nullam fusce fringilla nisi amet id viverra sit. Massa elementum risus nec sit aliquet.
            Eu feugiat metus facilisi quisque.
          </Typography>
          <Typography fontWeight="light" fontSize={20}>
            Lorem ipsum dolor sit amet consectetur. Amet ultrices ut amet vitae augue nibh tortor.
            Malesuada pretium egestas nec nunc mauris a feugiat.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
