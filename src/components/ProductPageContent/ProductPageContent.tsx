'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import CrossIcon from '@/public/plus.svg';
import Button from '@/src/components/common/Button/Button';
import { WindowWidth } from '@/src/enums/Width';
import { useWindowSize } from '@/src/hooks/useWindowSize';

interface ProductPageContentProps {
  productHeader: React.ReactNode | React.ReactElement;
  characteristics: React.ReactElement | React.ReactNode;
  note: React.ReactElement | React.ReactNode;
  locationField: React.ReactNode | React.ReactElement;
  similarObjectsField: React.ReactNode | React.ReactElement;
  creditCalculator?: React.ReactNode | React.ReactElement;
  agentForm: React.ReactNode | React.ReactElement;
  detailedDescription?: React.ReactNode | React.ReactElement;
}

const ProductPageContent = ({
  productHeader,
  characteristics,
  creditCalculator,
  note,
  locationField,
  agentForm,
  similarObjectsField,
  detailedDescription,
}: ProductPageContentProps) => {
  const breakpoint = useWindowSize();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const renderMobileLocationField = () =>
    breakpoint < WindowWidth.LG && breakpoint > WindowWidth.XS && locationField;

  const renderDesktopLocationField = () =>
    (breakpoint >= WindowWidth.LG || breakpoint <= WindowWidth.XS) && locationField;

  return (
    <div className={clsx('w-full', 'lg:px-12', 'px-5')}>
      <div
        className={clsx(
          'flex',
          'lg:justify-between',
          'justify-center',
          'gap-[30px]',
          'min-[1440px]:flex-row',
          'flex-col',
          'relative',
        )}
      >
        <div className={clsx('flex', 'flex-col', 'gap-y-[30px]', 'w-[calc(100% - 340px)]')}>
          {productHeader}
          {renderMobileLocationField()}
          <div className={clsx('flex', 'gap-8', 'xl:flex-row', 'flex-col')}>
            {characteristics}
            <div className={clsx('flex', 'flex-col', 'gap-8', 'xl:w-[65%]', 'w-full')}>
              {renderDesktopLocationField()}
              {detailedDescription}

              {note}
            </div>
          </div>
          {creditCalculator}
        </div>

        {breakpoint >= WindowWidth.SM && agentForm}
        {breakpoint < WindowWidth.SM && (
          <Button
            className={clsx(
              'fixed',
              'z-20',
              'bottom-5',
              'w-[90vw]',
              'left-[50%]',
              'translate-x-[-50%]',
            )}
            onClick={() => setIsOpen(true)}
          >
            Показать контакты
          </Button>
        )}
      </div>
      {isOpen && (
        <motion.div
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
          {agentForm}
        </motion.div>
      )}
      {similarObjectsField}
    </div>
  );
};

export default ProductPageContent;
