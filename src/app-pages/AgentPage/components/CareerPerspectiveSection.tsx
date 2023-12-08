import React from 'react';

import LinkButton from '@/src/components/LinkButton';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { AppChildRoutes } from '@/src/enums/AppRoutes';

const CareerPerspectiveSection = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-8 p-6">
      <div className="flex flex-col gap-4 max-w-7xl w-full">
        <Title fontSize={48}>Карьерные перспективы</Title>
        <Typography fontSize={20} fontWeight="light">
          Став успешным агентом, у вас есть возможность карьерного роста
        </Typography>
      </div>
      <div className="grid md:grid-cols-2 gap-4 max-w-7xl w-full">
        <div className="p-8 flex flex-col bg-[#343434] sm:gap-8 gap-4">
          <Typography fontSize={36} fontWeight="medium" color="text-secondary">
            Риэлтор
          </Typography>
          <Typography fontSize={24} fontWeight="light">
            Юрист который сопровождает все документы по проверке и продаже недвижимости.
          </Typography>
          <LinkButton linkClassName="mt-auto" type="vacancy" to={AppChildRoutes.Realtor} />
        </div>
        <div className="p-8 flex flex-col bg-[#343434] sm:gap-8 gap-4">
          <Typography fontSize={36} fontWeight="medium" color="text-secondary">
            Руководитель отдела продаж
          </Typography>
          <Typography fontSize={24} fontWeight="light">
            Менеджер который помогает стажерам освоится в професии Агента. 
          </Typography>
          <LinkButton linkClassName="mt-auto" type="vacancy" to={AppChildRoutes.Sales} />
        </div>
      </div>
    </section>
  );
};

export default CareerPerspectiveSection;
