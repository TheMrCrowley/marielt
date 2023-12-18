import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import DividerIcon from '@/public/agent-divider-icon.svg';
import Typography from '@/src/components/common/Typography';

const MainPointSection = () => {
  return (
    <>
      <section className={clsx('w-full', 'flex', 'justify-center', 'items-center', 'p-6')}>
        <div
          className={clsx(
            'max-w-7xl',
            'lg:gap-20',
            'gap-12',
            'flex',
            'flex-col',
            'bg-[url(/handshake.png)]',
            'bg-center',
            'bg-contain',
            'bg-no-repeat',
          )}
        >
          <div className={clsx('flex', 'lg:gap-32', 'gap-12', 'lg:flex-nowrap', 'flex-wrap')}>
            <div className={clsx('flex', 'gap-5', 'lg:max-w-xl')}>
              <p
                className={clsx(
                  'text-secondary',
                  'lg:text-6xl',
                  'text-4xl',
                  'lg:min-w-[70px]',
                  'min-w-[40px]',
                  'text-right',
                )}
              >
                01
              </p>
              <Typography fontSize={20} fontWeight="light">
                Агент берет на себя все хлопоты сделки, экономя время и силы клиентов. Он организует
                процесс от начала до конца, включая поиск наилучших предложений, подготовку
                документов и проведение всех необходимых бюрократических процедур.
              </Typography>
            </div>
            <div className={clsx('flex', 'gap-5', 'lg:max-w-xl')}>
              <p
                className={clsx(
                  'text-secondary',
                  'lg:text-6xl',
                  'text-4xl',
                  'text-right',
                  'lg:min-w-[70px]',
                  'min-w-[40px]',
                )}
              >
                02
              </p>
              <Typography fontSize={20} fontWeight="light">
                Искусство переговоров помогает провести переговоры и договориться всем
                собственникам, решить вопросы по переезду, перерегистрации, заключению цепочки
                сделок, оформлению кредитов, оплате ЖКУ и тд.
              </Typography>
            </div>
          </div>
          <div className={clsx('flex', 'lg:gap-32', 'gap-12', 'lg:flex-nowrap', 'flex-wrap')}>
            <div className={clsx('flex', 'gap-5', 'lg:max-w-xl')}>
              <p
                className={clsx(
                  'text-secondary',
                  'lg:text-6xl',
                  'text-4xl',
                  'text-right',
                  'lg:min-w-[70px]',
                  'min-w-[40px]',
                )}
              >
                03
              </p>
              <Typography fontSize={20} fontWeight="light">
                Благодаря его опыту и экспертизе, клиенты могут быть уверены, что цена на
                недвижимость будет выгодной, а стратегия продажи или поиска идеального жилья -
                правильной.
              </Typography>
            </div>
            <div className={clsx('flex', 'gap-5', 'lg:max-w-xl')}>
              <p
                className={clsx(
                  'text-secondary',
                  'lg:text-6xl',
                  'text-4xl',
                  'lg:min-w-[70px]',
                  'min-w-[40px]',
                  'text-right',
                )}
              >
                04
              </p>
              <Typography fontSize={20} fontWeight="light">
                Агент выступает в роли надежного посредника в разрешении возможных проблем и споров,
                обеспечивая безопасность и успешное завершение сделки.
              </Typography>
            </div>
          </div>
        </div>
      </section>
      <section className={clsx('w-full', 'flex', 'flex-col', 'justify-center', 'items-center')}>
        <div className={clsx('flex', 'justify-center', 'items-center', 'w-full', 'gap-8')}>
          <div className={clsx('h-[1px]', 'bg-[#B1B1B1]', 'flex-auto')} />
          <Image alt="agent-divider" src={DividerIcon} />
          <div className={clsx('h-[1px]', 'bg-[#B1B1B1]', 'flex-auto')} />
        </div>
        <Typography
          fontWeight="light"
          color="text-[#B1B1B1]"
          className="md:max-w-4xl text-center p-6"
        >
          Благодаря этим преимуществам агент по операциям с недвижимостью делает процесс покупки или
          продажи недвижимости максимально эффективным и комфортным для всех сторон.
        </Typography>
      </section>
    </>
  );
};

export default MainPointSection;
