import clsx from 'clsx';
import React from 'react';

import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';

const PerspectiveSection = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-8 p-6">
      <div className="flex flex-col gap-4 max-w-7xl w-full">
        <Title fontSize={48}>Перспективы работы в недвижимости</Title>
      </div>
      <div className="flex sm:flex-row flex-col gap-8 max-w-7xl w-full">
        <div className="flex-auto grid min-w-max gap-4">
          <Typography color="text-[#B1B1B1]">Рынок недвижимости РБ в цифрах</Typography>
          <div className="flex justify-between md:p-8 p-4 bg-[#343434] w-full gap-8">
            <Typography color="text-secondary">40 500 сделок</Typography>
            <Typography color="text-[#B1B1B1]">2020 г</Typography>
          </div>
          <div className="flex justify-between md:p-8 p-4 bg-[#343434] w-full gap-8">
            <Typography color="text-secondary">50 000 сделок</Typography>
            <Typography color="text-[#B1B1B1]">2021 г</Typography>
          </div>
          <div className="flex justify-between md:p-8 p-4 bg-[#343434] w-full gap-8">
            <Typography color="text-secondary">55 000 сделок</Typography>
            <Typography color="text-[#B1B1B1]">2022 г</Typography>
          </div>
          <div className="flex justify-between md:p-8 p-4 bg-[#343434] w-full gap-8">
            <Typography color="text-secondary">67 000 сделок</Typography>
            <Typography color="text-[#B1B1B1]">2023 г</Typography>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-3xl w-full justify-center">
          <div className="flex flex-col h-max justify-center">
            <Typography fontSize={24} fontWeight="medium">
              Инвестиции
            </Typography>
            <Typography fontWeight="light" className="pl-8">
              Недвижимость - была и остается самой понятной инвестицией у многих белорусов. Вы
              научитесь инвестировать и помогать своим клиентам зарабатывать на недвижимости.
            </Typography>
          </div>
          <div className="flex flex-col h-max justify-center">
            <Typography fontSize={24} fontWeight="medium">
              Продаётся всегда
            </Typography>
            <Typography fontWeight="light" className="pl-8">
              Жилье - базовая потребность. А поскольку люди всегда: женятся, разводятся, заводят
              детей, умирают - то всегда есть желающие купить и продать свою квартиру.
            </Typography>
          </div>
          <div className="flex flex-col h-max justify-center">
            <Typography fontSize={24} fontWeight="medium">
              Стабильный доход
            </Typography>
            <Typography fontWeight="light" className="pl-8">
              Инфляция и колебания курса никак не отразятся на ваших доходах. Квартиры продаются и
              комиссии агента рассчитываются по курсу НБРБ.
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerspectiveSection;
