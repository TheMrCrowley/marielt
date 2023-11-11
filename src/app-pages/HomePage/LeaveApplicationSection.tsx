'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import ArrowUp from '@/public/arrow-up.svg';
import Button from '@/src/components/common/Button';
import Title from '@/src/components/common/Title';

const LeaveApplicationSection = () => {
  return (
    <section className={clsx('w-full', 'bg-[#343434]')}>
      <div
        className={clsx(
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'lg:gap-14',
          'gap-8',
          'py-16',
          'px-8',
          'bg-no-repeat',
          'bg-[url(/dividers-bg.png)]',
          'bg-auto',
          'bg-center',
        )}
      >
        <Title fontSize={48} className="text-center" variant="h2">
          Оставьте заявку и мы ответим на все ваши вопросы
        </Title>
        <Button
          fontSize={20}
          fontWeight="medium"
          buttonType="filled"
          endIcon={<Image src={ArrowUp} alt="arrpw-up" />}
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

export default LeaveApplicationSection;
