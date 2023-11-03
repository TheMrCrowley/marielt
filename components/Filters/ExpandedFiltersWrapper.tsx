import clsx from 'clsx';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

import Modal from '@/components/Modal';
import Title from '@/components/Title';
import CrossIcon from '@/public/plus.svg';

interface ExpandedFiltersProps extends PropsWithChildren {
  isModalOpen: boolean;
  closeModal: () => void;
}

const ExpandedFiltersWrapper = ({ closeModal, isModalOpen, children }: ExpandedFiltersProps) => {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
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
          onClick={closeModal}
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
          <Title fontSize={40} fontWeight="medium">
            Расширенный фильтр
          </Title>
          {children}
        </section>
      </div>
    </Modal>
  );
};

export default ExpandedFiltersWrapper;
