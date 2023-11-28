import clsx from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';

import Portal from '@/src/components/common/Portal';
import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';

interface ProductMapModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ProductMapModal = ({ closeModal, isOpen }: ProductMapModalProps) => {
  const breakpoint = useWindowSize();

  if (!isOpen) {
    return null;
  }

  const renderMotion = () => {
    if (breakpoint < WindowWidth.LG) {
      return (
        <motion.div
          className={clsx('absolute', 'w-full', 'h-72', 'bg-white')}
          initial={{
            y: '100%',
            bottom: 0,
          }}
          animate={{
            y: '0%',
          }}
        ></motion.div>
      );
    }

    return (
      <motion.div
        className={clsx('absolute', 'w-96', 'h-full', 'bg-white', 'left-0')}
        initial={{
          x: '-100%',
          left: 0,
        }}
        animate={{
          x: '0%',
        }}
      ></motion.div>
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
