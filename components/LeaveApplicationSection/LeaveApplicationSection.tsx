'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import Button from '@/components/Button';
import Title from '@/components/Title';
import ArrowUp from '@/public/arrow-up.svg';

import styles from './LeaveApplicationSection.module.css';

const LeaveApplicationSection = () => {
  return (
    <section className={styles.section}>
      <div
        className={clsx(
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'gap-y-14',
          'pt-[70px]',
          'pb-[60px]',
          styles.wrapper,
        )}
      >
        <Title fontSize={48} className="text-center" variant="h2">
          Оставьте заявку и мы ответим на все ваши вопросы
        </Title>
        <Button
          fontSize={20}
          fontWeight="medium"
          buttonType="secondary"
          endContent={<Image src={ArrowUp} alt="arrpw-up" />}
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
