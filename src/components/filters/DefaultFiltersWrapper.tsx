'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

import FiltersButtonIcon from '@/public/filter.svg';
import CurrencySwitch from '@/src/components/CurrencySwitch';
import { WindowWidth } from '@/src/enums/Width';
import { useViewType } from '@/src/hooks/useViewType';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { useCurrency } from '@/src/store/currency';

interface DefaultFiltersWrapperProps extends PropsWithChildren {
  openModal: () => void;
  filtersList?: ReactNode;
}

const DefaultFiltersWrapper = ({
  children,
  openModal,
  filtersList,
}: DefaultFiltersWrapperProps) => {
  const searchParams = useSearchParams();
  const viewType = useViewType();
  const { changeCurrency, selectedCurrency } = useCurrency();
  const breakpoint = useWindowSize();
  const isMobile = breakpoint <= WindowWidth.SM;
  const isMapView = viewType === 'map';
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  const renderFiltersHeader = () =>
    isMobile || isMapView ? (
      <div className={clsx('flex', 'w-full', 'justify-between', 'items-start')}>
        <CurrencySwitch
          onChange={(cur) => changeCurrency(cur)}
          selectedCurrency={selectedCurrency}
        />
        <button className={clsx('hover:cursor-pointer')} onClick={() => setIsOpen(!isOpen)}>
          <Image src={FiltersButtonIcon} alt="filters-button" />
        </button>
      </div>
    ) : (
      <div
        className={clsx(
          'flex',
          'justify-between',
          'w-full',
          'md:flex-row',
          'flex-col',
          'items-start',
          'gap-y-5',
        )}
      >
        <CurrencySwitch
          onChange={(cur) => changeCurrency(cur)}
          selectedCurrency={selectedCurrency}
        />
        <button
          onClick={openModal}
          className={clsx('text-[#B1B1B1]', 'underline', 'md:text-xl', 'text-base')}
        >
          Расширенный фильтр
        </button>
      </div>
    );

  const renderFilters = () =>
    isMobile || isMapView ? (
      <motion.div initial={false} animate={isOpen ? 'open' : 'closed'}>
        {renderFiltersHeader()}
        <motion.div
          variants={{
            open: {
              overflow: 'visible',

              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
              height: 'min-content',
            },
            closed: {
              overflow: 'hidden',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.7,
              },
              height: 0,
            },
          }}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          <button
            onClick={openModal}
            className={clsx('text-[#B1B1B1]', 'underline', 'md:text-xl', 'text-base')}
          >
            Расширенный фильтр
          </button>
          <div className={clsx('flex', 'flex-col', 'gap-8')}>{children}</div>
        </motion.div>
      </motion.div>
    ) : (
      <>
        {renderFiltersHeader()}
        {children}
      </>
    );

  return (
    <div
      className={clsx(
        'w-full',
        'bg-[#262626]',
        'md:py-8',
        'py-4',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'gap-y-10',
        'md:px-8',
        'px-4',
      )}
    >
      <section
        className={clsx(
          'flex',
          'flex-col',
          'flex-auto',
          'w-full',
          'md:gap-y-10',
          'gap-y-5',
          'md:max-w-[1400px]',
          'max-w-full',
        )}
      >
        {renderFilters()}
      </section>
      {filtersList}
    </div>
  );
};

export default DefaultFiltersWrapper;
