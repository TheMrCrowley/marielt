'use client';

import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import Portal from '@/components/Portal';

interface ModalProps extends PropsWithChildren {
  onClose: () => void;
  isOpen: boolean;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
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
          'p-9',
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
          onClick={onClose}
          role="button"
        />
        {children}
      </div>
    </Portal>
  );
};

export default Modal;
