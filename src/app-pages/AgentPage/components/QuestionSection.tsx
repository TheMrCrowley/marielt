'use client';

import Image from 'next/image';
import React from 'react';

import ArrowUp from '@/public/arrow-up.svg';
import Button from '@/src/components/common/Button';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';

const QuestionSection = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center p-6 bg-[#343434] bg-[url(/question-section-bg.png)] bg-no-repeat bg-contain bg-right">
      <div className="max-w-7xl w-full flex flex-col gap-8 py-8">
        <Title fontSize={48}>Остались вопросы или сомнения?</Title>
        <Typography fontSize={24} fontWeight="light">
          Оставьте заявку. Мы с удовольствием ответим на все ваши вопросы и поможем погрузиться в
          мир недвижимости
        </Typography>
        <Button
          fontSize={20}
          fontWeight="medium"
          buttonType="filled"
          endIcon={<Image src={ArrowUp} alt="arrpw-up" />}
          className="w-max"
          onClick={() => {
            window.scrollTo({
              behavior: 'smooth',
              top: 0,
            });
          }}
        >
          Оставить заявку
        </Button>
      </div>
    </section>
  );
};

export default QuestionSection;
