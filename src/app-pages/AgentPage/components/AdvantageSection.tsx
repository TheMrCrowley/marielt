import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import AgentPlusIcon from '@/public/agent-plus.svg';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';

const AdvantageSection = () => {
  return (
    <section
      className={clsx(
        'w-full',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'p-6',
        'bg-[url(/advantage-bg.png)]',
        'bg-no-repeat',
        'bg-right-bottom',
        'bg-contain',
      )}
    >
      <div className={clsx('max-w-7xl', 'w-full', 'mb-8')}>
        <Title fontSize={48} fontWeight="normal">
          Плюсы работы в Мариэлт
        </Title>
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-10', 'max-w-7xl', 'w-full')}>
        <div className="flex flex-col gap-2 md:max-w-4xl max-w-full">
          <div className={clsx('flex', 'gap-4', 'items-center', 'p-4', 'bg-[#343434]', 'md:w-1/2')}>
            <Image alt="plus-icon" src={AgentPlusIcon} />
            <Typography color="text-secondary" fontSize={24} fontWeight="medium">
              Забота о сотрудниках
            </Typography>
          </div>
          <Typography className="md:pl-8" fontWeight="light">
            Компания заботится о своих сотрудниках и предоставляет им регулярно бизнес тренинги,
            персональные сессии с штатным психологом, коучами, НЛП-мастерами за счет компании.
          </Typography>
        </div>
        <div className="flex flex-col gap-2 md:max-w-4xl max-w-full">
          <div className={clsx('flex', 'gap-4', 'items-center', 'p-4', 'bg-[#343434]', 'md:w-1/2')}>
            <Image alt="plus-icon" src={AgentPlusIcon} />
            <Typography color="text-secondary" fontSize={24} fontWeight="medium">
              Поддержка
            </Typography>
          </div>
          <Typography className="md:pl-8" fontWeight="light">
            По окончанию обучения, за вами закрепляются опытные руководители отдела продаж, которые
            будут курировать вас и направлять на всех этапах работы. Бизнес-процессы выстроены таким
            образом, чтоб минимизировать ошибки и сделать вашу работу максимально комфортной и
            приятной.
          </Typography>
        </div>
        <div className="flex flex-col gap-2 md:max-w-4xl max-w-full">
          <div className={clsx('flex', 'gap-4', 'items-center', 'p-4', 'bg-[#343434]', 'md:w-1/2')}>
            <Image alt="plus-icon" src={AgentPlusIcon} />
            <Typography color="text-secondary" fontSize={24} fontWeight="medium">
              Инструменты
            </Typography>
          </div>
          <Typography className="md:pl-8" fontWeight="light">
            Собственная CRM-система, которая направлена на упрощение вашей работы. Фиксирует все
            взаимодействия с клиентами и позволит легко управлять своим временем и задачами.
          </Typography>
        </div>
        <div className="flex flex-col gap-2 md:max-w-4xl max-w-full">
          <div className={clsx('flex', 'gap-4', 'items-center', 'p-4', 'bg-[#343434]', 'md:w-1/2')}>
            <Image alt="plus-icon" src={AgentPlusIcon} />
            <Typography color="text-secondary" fontSize={24} fontWeight="medium">
              Конкурсы и подарки
            </Typography>
          </div>
          <Typography className="md:pl-8" fontWeight="light">
            Компания регулярно проводит конкурсы между сотрудниками и разыгрывает IPhone и MacBook
            последних моделей.
          </Typography>
        </div>
        <div className="flex flex-col gap-2 md:max-w-4xl max-w-full">
          <div className={clsx('flex', 'gap-4', 'items-center', 'p-4', 'bg-[#343434]', 'md:w-1/2')}>
            <Image alt="plus-icon" src={AgentPlusIcon} />
            <Typography color="text-secondary" fontSize={24} fontWeight="medium">
              Корпоративная жизнь
            </Typography>
          </div>
          <Typography className="md:pl-8" fontWeight="light">
            Регулярно проходят летний и зимний корпоратив в самых крутых локациях с ведущими, играми
            и шикарным застольем.
          </Typography>
        </div>
        <div className="flex flex-col gap-2 md:max-w-4xl max-w-full">
          <div className={clsx('flex', 'gap-4', 'items-center', 'p-4', 'bg-[#343434]', 'md:w-1/2')}>
            <Image alt="plus-icon" src={AgentPlusIcon} />
            <Typography color="text-secondary" fontSize={24} fontWeight="medium">
              Клубы по интересам
            </Typography>
          </div>
          <Typography className="md:pl-8" fontWeight="light">
            У нас штате более 150 сотрудников которые любят активный отдых. Присоединяйся к
            корпоративным клубам по интересам: мафия, покер, футбол, волейбол, денежный поток и
            многое другое.
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default AdvantageSection;
