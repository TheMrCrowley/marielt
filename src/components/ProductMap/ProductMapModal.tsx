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

  if (breakpoint > WindowWidth.LG) {
    return (
      <motion.div
        className={clsx('absolute', 'w-min', 'h-full', 'bg-[#3D3D3D]', 'z-20')}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: {
            x: '0%',
            left: '0px',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.7,
              delayChildren: 1,
              staggerChildren: 0.05,
            },
          },
          closed: {
            x: '-100%',
            left: '-64px',
          },
        }}
      >
        <div
          className={clsx(
            'h-full',
            'scrollbar-thin',
            'scrollbar-thumb-primary',
            'scrollbar-track-secondary',
            'overflow-y-auto',
          )}
        >
          {children}
        </div>
        <button
          onClick={closeModal}
          className={clsx(
            'absolute',
            'bg-inherit',
            'w-16',
            'h-16',
            '-right-16',
            'top-1/2',
            '-translate-y-1/2',
            'z-50',
            'flex',
            'justify-center',
            'items-center',
            'rounded-r-md',
          )}
        >
          <svg viewBox="0 0 19 18" height="5" width="5" className="w-5 h-5" fill="#ffffff">
            <path d="M9.71 1.7A1 1 0 1 0 8.3.3l1.4 1.4zM1.01 9 .3 8.3a1 1 0 0 0 0 1.4L1 9zm7.29 8.7a1 1 0 0 0 1.41-1.4L8.3 17.7zm9.41-16A1 1 0 1 0 16.3.3l1.41 1.4zM9.01 9l-.71-.7a1 1 0 0 0 0 1.4L9 9zm7.29 8.7a1 1 0 0 0 1.41-1.4l-1.41 1.4zM8.3.3l-8 8 1.4 1.4 8-8L8.3.3zm-8 9.4 8 8 1.41-1.4-8-8L.3 9.7zm16-9.4-8 8 1.4 1.4 8-8L16.3.3zm-8 9.4 8 8 1.41-1.4-8-8L8.3 9.7z"></path>
          </svg>
        </button>
      </motion.div>
    );
  }

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
      </div>
    </Portal>
  );
};

export default ProductMapModal;
