import clsx from 'clsx';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

import CrossIcon from '@/public/plus.svg';
import Portal from '@/src/components/common/Portal';
import Title from '@/src/components/common/Title';

interface ExpandedFiltersProps extends PropsWithChildren {
  isModalOpen: boolean;
  closeModal: () => void;
}

const ExpandedFiltersWrapper = ({ closeModal, isModalOpen, children }: ExpandedFiltersProps) => {
  if (!isModalOpen) {
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
          'z-10',
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
          onClick={closeModal}
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
      </div>
    </Portal>
  );
};

export default ExpandedFiltersWrapper;
