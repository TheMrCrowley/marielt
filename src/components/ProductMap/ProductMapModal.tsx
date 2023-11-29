import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { PropsWithChildren } from 'react';

import Portal from '@/src/components/common/Portal';
import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';

interface ProductMapModalProps extends PropsWithChildren {
  isOpen: boolean;
  closeModal: () => void;
}

const ProductMapModal = ({ closeModal, isOpen, children }: ProductMapModalProps) => {
  const breakpoint = useWindowSize();

  if (!isOpen) {
    return null;
  }

  const renderMotion = () => {
    if (breakpoint < WindowWidth.LG) {
      return (
        <motion.div
          className={clsx(
            'absolute',
            'w-full',
            'h-[50vh]',
            'bg-[#3D3D3D]',
            'scrollbar-thin',
            'scrollbar-thumb-primary',
            'scrollbar-track-secondary',
            'overflow-y-auto',
          )}
          initial={{
            y: '100%',
            bottom: 0,
          }}
          animate={{
            y: '0%',
          }}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <motion.div
        className={clsx(
          'absolute',
          'w-96',
          'h-full',
          'bg-[#3D3D3D]',
          'left-0',
          'scrollbar-thin',
          'scrollbar-thumb-primary',
          'scrollbar-track-secondary',
          'overflow-y-auto',
        )}
        initial={{
          x: '-100%',
          left: 0,
        }}
        animate={{
          x: '0%',
        }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <Portal>
      <div
        className={clsx(
          'fixed',
          'top-0',
          'left-0',
          'right-0',
          'bottom-0',
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
          onClick={closeModal}
          role="button"
        />
        {renderMotion()}
      </div>
    </Portal>
  );
};

export default ProductMapModal;
