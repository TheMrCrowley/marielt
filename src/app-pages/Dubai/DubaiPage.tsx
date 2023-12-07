import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import GlobeIcon from '@/public/globe.svg';
import InstagramIcon from '@/public/instagram.svg';
import Logo from '@/public/logo.svg';
import TelegramIcon from '@/public/telegram-icon.svg';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';

const DubaiPage = () => {
  return (
    <section className={clsx('flex-auto', 'w-full', 'flex', 'flex-col', 'items-center')}>
      <section
        className={clsx(
          'flex',
          'justify-center',
          'items-center',
          'w-full',
          'bg-[url(/dubai-bg.png)]',
          'bg-center',
          'bg-cover',
          'md:h-[740px]',
          'h-[500px]',
        )}
      >
        <div
          className={clsx(
            'w-full',
            'py-12',
            'backdrop-blur-sm',
            'flex',
            'flex-col',
            'justify-center',
            'items-center',
            'gap-6',
            'bg-primary',
            'bg-opacity-50',
          )}
        >
          <Image
            alt="logo"
            src={Logo}
            className={clsx('lg:w-[220px]', 'md:w-[200px]', 'sm:w-[180px]', 'w-[120px]')}
          />
          <Title
            fontSize={128}
            className="md:tracking-[64px] md:indent-16 tracking-[32px] indent-8"
          >
            DUBAI
          </Title>
        </div>
      </section>
      <section
        className={clsx('flex', 'flex-col', 'py-12', 'px-6', 'max-w-7xl', 'w-full', 'gap-8')}
      >
        <Title variant="h2" fontSize={48}>
          Marielt DUBAI
        </Title>
        <Typography fontWeight="light">
          Lorem ipsum dolor sit amet consectetur. Libero id scelerisque condimentum nisi. Id diam
          quisque lacus malesuada sed viverra nulla quis scelerisque. Vel purus dictum nisi tempor
          sagittis duis fermentum id lobortis. Tempus lorem quis sagittis venenatis tristique lectus
          tincidunt eu. Eget sed lorem ac sit maecenas id. Ultricies feugiat enim rhoncus arcu nulla
          nunc accumsan venenatis.
        </Typography>
        <Typography fontWeight="light">
          Adipiscing sed neque vel sed lorem nibh. Parturient sit lorem cras nascetur aliquam odio
          gravida. Turpis sagittis a consequat ullamcorper. Ipsum convallis id diam vestibulum odio
          scelerisque iaculis. Eget sit lectus libero aenean ultrices eleifend tristique morbi arcu.
          Eget aliquam quam eu pellentesque feugiat pharetra. Nibh quis adipiscing euismod cursus
          amet dapibus facilisis. Laoreet neque vitae cursus tellus.
        </Typography>
        <section
          className={clsx('grid', 'w-full', 'gap-8', 'justify-center')}
          style={{ gridTemplateColumns: 'repeat(auto-fit, 330px)' }}
        >
          <a
            href="https://marielt.estate/"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'flex',
              'justify-center',
              'items-center',
              'bg-[#343434]',
              'gap-4',
              'p-4',
            )}
          >
            <Image src={GlobeIcon} alt="instagram" width={40} height={40} />
            <Typography color="text-[#A3A3A3]">Официальный сайт</Typography>
          </a>
          <a
            href="https://t.me/marielt_dubaii"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'flex',
              'justify-center',
              'items-center',
              'bg-[#343434]',
              'gap-4',
              'p-4',
            )}
          >
            <Image src={TelegramIcon} alt="instagram" width={40} height={40} />
            <Typography color="text-[#A3A3A3]">Telegram</Typography>
          </a>
          <a
            href="https://www.instagram.com/marielt_dubai"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'flex',
              'justify-center',
              'items-center',
              'bg-[#343434]',
              'gap-4',
              'p-4',
            )}
          >
            <Image src={InstagramIcon} alt="instagram" width={40} height={40} />
            <Typography color="text-[#A3A3A3]">Instagram</Typography>
          </a>
        </section>
        <Typography fontWeight="light">
          Lorem ipsum dolor sit amet consectetur. Libero id scelerisque condimentum nisi. Id diam
          quisque lacus malesuada sed viverra nulla quis scelerisque. Vel purus dictum nisi tempor
          sagittis duis fermentum id lobortis. Tempus lorem quis sagittis venenatis tristique lectus
          tincidunt eu. Eget sed lorem ac sit maecenas id. Ultricies feugiat enim rhoncus arcu nulla
          nunc accumsan venenatis.
        </Typography>
      </section>
    </section>
  );
};

export default DubaiPage;
