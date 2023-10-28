import clsx from 'clsx';
import Image from 'next/image';
import React, { useContext } from 'react';

import Button from '@/components/Button';
import { FlatsFiltersContext } from '@/components/Filters/Flats/FlatsContextProvider';
import Modal from '@/components/Modal';
import Switch from '@/components/Switch';
import Title from '@/components/Title';
import CrossIcon from '@/public/plus.svg';

import ExpandedAreaFilter from './components/ExpandedAreaFilter';
import FloorFilter from './components/FloorFilter';
import HouseTypeFilter from './components/HouseTypeFilter';
import LayoutFilter from './components/LayoutFilter';
import SaleTermFilter from './components/SaleTermFilter';
import YearsFilter from './components/YearsFilter';

interface ExpandedProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const ExpandedFilters = ({ closeModal, isModalOpen }: ExpandedProps) => {
  const {
    applyFilters,
    filters: { furniture, parking },
    updateFilters,
  } = useContext(FlatsFiltersContext);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div
        className={clsx(
          'flex',
          'py-12',
          'px-20',
          'bg-[#262626]',
          'max-w-[1620px]',
          'w-full',
          'relative',
          'z-10',
          'flex-auto',
          'h-full',
          'overflow-hidden',
        )}
      >
        <button
          className={clsx('flex', 'justify-center', 'items-center', 'absolute', 'top-6', 'right-6')}
          onClick={closeModal}
        >
          <Image src={CrossIcon} alt="close-icon" />
        </button>
        <section
          className={clsx(
            'flex',
            'flex-col',
            'w-full',
            'justify-start',
            'overflow-y-auto',
            'gap-y-8',
            'px-4',
            'scrollbar-thin',
            'scrollbar-thumb-primary',
            'scrollbar-track-secondary',
          )}
        >
          <Title fontSize={40} fontWeight="medium">
            Расширенный фильтр
          </Title>
          <div className={clsx('flex', 'w-full', 'justify-between', 'gap-x-3')}>
            <FloorFilter />
            <HouseTypeFilter />
          </div>
          <ExpandedAreaFilter />
          <LayoutFilter />
          <div className={clsx('flex', 'w-full', 'justify-start', 'gap-x-8')}>
            <YearsFilter />
            <SaleTermFilter />
          </div>
          <div className={clsx('flex', 'items-end', 'gap-x-12')}>
            <Switch
              label="Мебель"
              onChange={(checked) => updateFilters({ furniture: checked })}
              isChecked={furniture}
            />
            <Switch
              label="Парковка"
              onChange={(checked) => updateFilters({ parking: checked })}
              isChecked={parking}
            />
          </div>
          <Button className={clsx('self-end', 'flex-1', 'mt-auto')} onClick={applyFilters}>
            Применить
          </Button>
        </section>
      </div>
    </Modal>
  );
};

export default ExpandedFilters;
