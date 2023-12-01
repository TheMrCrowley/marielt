import clsx from 'clsx';
import Image from 'next/image';

import NotFoundImage from '@/public/not-found-img.png';
import Typography from '@/src/components/common/Typography/Typography';

const NotFoundPage = () => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'gap-3',
        'm-auto',
        'p-4',
        'h-[75vh]',
      )}
    >
      <Image src={NotFoundImage} alt="404" />
      <p
        className={clsx(
          'mt-5',
          'text-center',
          'md:text-2xl',
          'xl:text-4xl',
          'xs:text-xl',
          'font-light',
          'text-[#fff]',
        )}
      >
        Упс... Кажется что-то пошло не так.
      </p>
      <Typography fontSize={24} fontWeight="light" className="text-center" color="text-[#868686]">
        Но мы уже работаем над этим
      </Typography>
    </div>
  );
};

export default NotFoundPage;
