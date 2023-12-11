'use client';

import clsx from 'clsx';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

import MessageIcon from '@/public/ChatLeftText.svg';
import CrossIcon from '@/public/plus.svg';
import CustomerForm from '@/src/components/common/CustomerForm';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';
import { ApplicationFormType } from '@/src/enums/ApplicationForm';
import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { sendGenericApplication } from '@/src/services/applicationServices';

const PageForm = () => {
  const breakpoint = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = async ({ name, phone }: { name: string; phone: string }) => {
    await sendGenericApplication({
      name,
      phone,
      type: ApplicationFormType.HR,
    });
  };

  const renderForm = () => {
    return (
      <section className="sm:max-w-sm w-full flex flex-col bg-secondary justify-center items-center py-12 px-4 gap-4">
        <Title fontSize={24} fontWeight="medium" className="!text-[#474747] text-center">
          Интересуют подробности?
        </Title>
        <Typography fontSize={16} fontWeight="medium" color="text-[#474747] text-center">
          Мы перезвоним и расскажем подробнее
        </Typography>
        <CustomerForm onApply={handleApply} />
      </section>
    );
  };

  if (breakpoint >= WindowWidth.SM) {
    return renderForm();
  }

  return (
    <>
      <button className="w-full p-4 bg-secondary flex items-center" onClick={() => setIsOpen(true)}>
        <div className={clsx('w-full', 'flex', 'flex-col', '!items-start')}>
          <Title fontSize={24} fontWeight="medium" className="!text-[#474747]">
            Интересуют подробности?
          </Title>
          <Typography fontSize={16} fontWeight="medium" color="text-[#474747]">
            Мы перезвоним и расскажем подробнее
          </Typography>
        </div>
        <Image src={MessageIcon} alt="message" />
      </button>
      {isOpen && (
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{
              position: 'fixed',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 30,
              bottom: 0,
              left: 0,
              y: '-100%',
              opacity: '0',
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
          >
            <button
              className={clsx(
                'flex',
                'justify-center',
                'items-center',
                'absolute',
                'md:top-4',
                'md:right-4',
                'top-4',
                'right-4',
                'z-20',
              )}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Image
                src={CrossIcon}
                alt="close-icon"
                className={clsx('md:w-8', 'md:h-8', 'w-5', 'h-5')}
              />
            </button>
            {renderForm()}
          </m.div>
        </LazyMotion>
      )}
    </>
  );
};

export default PageForm;
