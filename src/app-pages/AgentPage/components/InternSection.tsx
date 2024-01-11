import React from 'react';

import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';

const InternSection = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-8 p-6">
      <div className="max-w-7xl w-full flex flex-col gap-4">
        <Title fontSize={48}>Стажировка</Title>
      </div>
      <div className="max-w-7xl w-full flex flex-col">
        <Typography
          fontWeight="light"
          className="pb-4 pl-4 relative before before:block before:w-2 before:h-2 before:bg-secondary before:z-30 before:absolute before:left-0 before:translate-y-full after after:block after:absolute after:w-[2px] after:h-full after:z-20 after:bg-[#474747] after:left-[3px] after:top-2"
        >
          С вами каждый день работает команда менеджеров, бизнес-тренеров, коуча и юристов.
        </Typography>
        <Typography
          fontWeight="light"
          className="pb-4 pl-4 relative before before:block before:w-2 before:h-2 before:bg-secondary before:z-30 before:absolute before:left-0 before:translate-y-full after after:block after:absolute after:w-[2px] after:h-full after:z-20 after:bg-[#474747] after:left-[3px] after:top-2"
        >
          С вами 24/7 ваши руководители, которые помогают решать все вопросы - от вспоминания
          теории, помощи в переговорах, до сопровождения сделки.
        </Typography>
        <Typography
          fontWeight="light"
          className="pb-4 pl-4 relative before before:block before:w-2 before:h-2 before:bg-secondary before:z-30 before:absolute before:left-0 before:translate-y-full after after:block after:absolute after:w-[2px] after:h-full after:z-20 after:bg-[#474747] after:left-[3px] after:top-2"
        >
          Во время стажировки вы можете посещать регулярные дополнительные углубленные тренинги от
          опытных агентов и нашей команды бизнес-тренеров. Расширять свои знания и обмениваться
          опытом.
        </Typography>
        <Typography
          fontWeight="light"
          className="pb-4 pl-4 relative before before:block before:w-2 before:h-2 before:bg-secondary before:z-30 before:absolute before:left-0 before:translate-y-full after after:block after:absolute after:w-[2px] after:h-full after:z-20 after:bg-[#474747] after:left-[3px] after:top-2 overflow-hidden"
        >
          Благодаря индивидуальному подходу, коуч-сессиям по целеполаганию, тайм менеджменту, работе
          с ограничивающими убеждениями, эмоциями, применением техник продаж вы неизбежно
          становитесь мастером переговоров и убеждения.
        </Typography>
      </div>
      <div className="max-w-7xl w-full flex flex-col gap-4">
        <Title fontSize={24}>Чему научитесь и что вам это даст</Title>
        <div className="flex flex-col max-w-xl gap-4 flex-wrap">
          <Typography
            className="pl-4 relative before before:block before:w-2 before:h-2 before:bg-secondary before:z-30 before:absolute before:left-0 before:-translate-y-1/2 before:top-1/2 overflow-hidden"
            fontWeight="light"
          >
            Психология
          </Typography>
          <Typography
            className="pl-4 relative before before:block before:w-2 before:h-2 before:bg-secondary before:z-30 before:absolute before:left-0 before:-translate-y-1/2 before:top-1/2 overflow-hidden"
            fontWeight="light"
          >
            Типология
          </Typography>
          <Typography
            className="pl-4 relative before before:block before:w-2 before:h-2 before:bg-secondary before:z-30 before:absolute before:left-0 before:-translate-y-1/2 before:top-1/2 overflow-hidden"
            fontWeight="light"
          >
            Целеполагание
          </Typography>
          <Typography
            className="pl-4 relative before before:block before:w-2 before:h-2 before:bg-secondary before:z-30 before:absolute before:left-0 before:-translate-y-1/2 before:top-1/2 overflow-hidden"
            fontWeight="light"
          >
            Уверенность
          </Typography>
          <Typography
            className="pl-4 relative before before:block before:w-2 before:h-2 before:bg-secondary before:z-30 before:absolute before:left-0 before:-translate-y-1/2 before:top-1/2 overflow-hidden"
            fontWeight="light"
          >
            Дисциплина
          </Typography>
          <Typography
            className="pl-4 relative before before:block before:w-2 before:h-2 before:bg-secondary before:z-30 before:absolute before:left-0 before:-translate-y-1/2 before:top-1/2 overflow-hidden"
            fontWeight="light"
          >
            Ответственность
          </Typography>
          <Typography
            className="pl-4 relative before before:block before:w-2 before:h-2 before:bg-secondary before:z-30 before:absolute before:left-0 before:-translate-y-1/2 before:top-1/2 overflow-hidden"
            fontWeight="light"
          >
            И многое другое
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default InternSection;
