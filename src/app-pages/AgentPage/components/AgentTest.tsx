'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';

import CheckBoxIcon from '@/public/CardChecklist.svg';
import CrossIcon from '@/public/plus.svg';
import Button from '@/src/components/common/Button';
import Portal from '@/src/components/common/Portal';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography';

const AgentTestContent = () => {
  return <div>test</div>;
};

const AgentTestModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className={clsx(
          'fixed',
          'top-0',
          'left-0',
          'right-0',
          'bottom-0',
          'lg:p-9',
          'md:p-4',
          'p-0',
          'box-border',
          'z-50',
          'flex',
          'justify-center',
          'items-center',
          'bg-[#00000099]',
          'backdrop-blur-sm',
        )}
        role="dialog"
      >
        <div
          className={clsx(
            'absolute',
            'top-0',
            'left-0',
            'right-0',
            'bottom-0',
            'cursor-pointer',
            'bg-[#00000099]',
            'z-0',
          )}
          onClick={onClose}
          role="button"
        />
        <div
          className={clsx(
            'flex',
            'bg-[#262626]',
            'md:max-w-[1620px]',
            'w-full',
            'relative',
            'z-10',
            'flex-auto',
            'h-full',
            'overflow-hidden',
            'lg:py-12',
            'py-6',
            'lg:px-20',
            'px-0',
            'bg-[url(/modal-bg.png)]',
          )}
        >
          <button
            className={clsx(
              'flex',
              'justify-center',
              'items-center',
              'absolute',
              'md:top-6',
              'md:right-6',
              'top-9',
              'right-4',
            )}
            onClick={onClose}
          >
            <Image
              src={CrossIcon}
              alt="close-icon"
              className={clsx('md:w-8', 'md:h-8', 'w-4', 'h-4')}
            />
          </button>
          <section
            className={clsx(
              'flex',
              'flex-col',
              'w-full',
              'justify-start',
              'overflow-y-auto',
              'gap-y-10',
              'px-4',
              'scrollbar-thin',
              'scrollbar-thumb-primary',
              'scrollbar-track-secondary',
            )}
          >
            <AgentTestContent />
          </section>
        </div>
      </div>
    </Portal>
  );
};

const AgentTest = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className={clsx('flex', 'flex-col', 'gap-4', 'max-w-max')}>
        <div className="flex gap-4 items-center">
          <Image src={CheckBoxIcon} alt="checkbox" />
          <div className="flex flex-col">
            <Title fontSize={24}>Пройди тест</Title>
            <Typography fontSize={16} color="text-[#B1B1B1]">
              и узнай на сколько ты агент
            </Typography>
          </div>
        </div>
        <Button
          buttonType="bordered"
          className="border-white text-white"
          onClick={() => setIsOpen(true)}
        >
          Начать
        </Button>
      </div>
      <AgentTestModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default AgentTest;
