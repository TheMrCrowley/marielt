import clsx from 'clsx';
import Image from 'next/image';
import React, { useContext, useState } from 'react';

import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';
import CheckboxButton from '@/components/CheckboxButton';
import CurrencySwitch from '@/components/CurrencySwitch';
import InputFromTo from '@/components/InputFromTo';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import Title from '@/components/Title';
import CrossIcon from '@/public/plus.svg';

import { FlatsFiltersContext } from './FlatsContextProvider';

const RoominessFilter = () => {
  const {
    filters: { roominess },
    updateFilters,
  } = useContext(FlatsFiltersContext);

  return (
    <ButtonGroup
      label="Комнатность"
      values={roominess}
      items={[
        { label: 'Доля', value: 'part' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4+', value: '4+' },
      ]}
      onChange={(selected) =>
        updateFilters({
          roominess: selected,
        })
      }
    />
  );
};

const PriceFilter = () => {
  const {
    filters: { currency, priceFrom, priceTo },
    updateFilters,
  } = useContext(FlatsFiltersContext);

  return (
    <InputFromTo
      label="Стоимость"
      subLabel={currency}
      values={{
        from: priceFrom,
        to: priceTo,
      }}
      onChange={({ from, to }) =>
        updateFilters({
          priceFrom: from,
          priceTo: to,
        })
      }
    />
  );
};

const DistrictFilter = () => {
  const {
    data: { district: districtsOptions },
    filters: { district: selectedDistricts },
    updateFilters,
  } = useContext(FlatsFiltersContext);

  if (!districtsOptions) {
    return null;
  }

  return (
    <Select
      label="Район"
      isMulti
      options={districtsOptions.map((district) => ({
        label: district.split(' ')[0],
        value: district,
      }))}
      values={selectedDistricts}
      onChange={(selected) =>
        updateFilters({
          district: selected,
        })
      }
    />
  );
};

const MicroDistrictFilter = () => {
  const {
    filters: { microDistrict: selectedMicroDistricts },
    data: { microDistrict: microDistrictsOptions },
    updateFilters,
  } = useContext(FlatsFiltersContext);

  if (!microDistrictsOptions) {
    return null;
  }

  return (
    <Select
      label="Микрорайон"
      isMulti
      options={microDistrictsOptions.map((microDistrict) => ({
        label: microDistrict,
        value: microDistrict,
      }))}
      values={selectedMicroDistricts}
      onChange={(selected) =>
        updateFilters({
          microDistrict: selected,
        })
      }
    />
  );
};

const MetroFilter = () => {
  const {
    filters: { metro: selectedMetro },
    data: { metro: metroOptions },
    updateFilters,
  } = useContext(FlatsFiltersContext);

  if (!metroOptions) {
    return null;
  }

  return (
    <Select
      label="Метро"
      isMulti
      options={metroOptions.map((station) => ({
        label: station,
        value: station,
      }))}
      values={selectedMetro}
      onChange={(selected) =>
        updateFilters({
          metro: selected,
        })
      }
    />
  );
};

const AreaFilter = () => {
  const {
    filters: { areaFrom, areaTo },
    updateFilters,
  } = useContext(FlatsFiltersContext);

  return (
    <InputFromTo
      label="Площадь"
      subLabel={
        <span>
          м <sup>2</sup>
        </span>
      }
      values={{
        from: areaFrom,
        to: areaTo,
      }}
      onChange={({ from, to }) =>
        updateFilters({
          areaFrom: from,
          areaTo: to,
        })
      }
    />
  );
};

const FlatsFilter = () => {
  const {
    filters: {
      currency,
      floorFrom,
      floorTo,
      isLastFloor,
      isNotFirstFloor,
      isNotLastFloor,
      maxFloorsFrom,
      maxFloorsTo,
      houseType,
    },
    updateFilters,
    applyFilters,
  } = useContext(FlatsFiltersContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className={clsx('w-full', 'bg-[#262626]', 'pt-14', 'pb-9', 'flex', 'justify-center')}>
        <div className={clsx('flex', 'flex-col', 'gap-y-10', 'max-w-7xl', 'flex-auto')}>
          <div className={clsx('flex', 'justify-between', 'w-full')}>
            <CurrencySwitch
              onChange={(cur) => updateFilters({ currency: cur })}
              selectedCurrency={currency}
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className={clsx('text-[#B1B1B1]', 'underline', 'text-[20px]')}
            >
              Расширенный фильтр
            </button>
          </div>
          <div className={clsx('flex', 'items-center', 'justify-between', 'gap-x-9')}>
            <RoominessFilter />
            <PriceFilter />
            <DistrictFilter />
            <MicroDistrictFilter />
            <MetroFilter />
          </div>
          <div className={clsx('flex', 'items-center', 'justify-between', 'gap-x-5')}>
            <AreaFilter />
            <Button className={clsx('self-end', 'flex-1')} onClick={applyFilters}>
              Применить
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          className={clsx(
            'flex',
            'py-12',
            'px-24',
            'bg-[#262626]',
            'max-w-[1620px]',
            'w-full',
            'relative',
            'z-10',
          )}
        >
          <button
            className={clsx(
              'flex',
              'justify-center',
              'items-center',
              'absolute',
              'top-6',
              'right-6',
            )}
            onClick={() => setIsModalOpen(false)}
          >
            <Image src={CrossIcon} alt="close-icon" />
          </button>
          <section className={clsx('flex', 'flex-col', 'gap-y-20', 'w-full')}>
            <Title fontSize={40} fontWeight="medium">
              Расширенный фильтр
            </Title>
            <div className={clsx('flex', 'w-full', 'justify-between', 'gap-x-3')}>
              <div className={clsx('flex', 'items-end', 'gap-x-2')}>
                <InputFromTo
                  label="Этаж"
                  values={{
                    from: floorFrom,
                    to: floorTo,
                  }}
                  onChange={({ from, to }) =>
                    updateFilters({
                      floorFrom: from,
                      floorTo: to,
                    })
                  }
                  minMax={{
                    max: 50,
                    min: 1,
                  }}
                />
                <CheckboxButton
                  isChecked={isNotFirstFloor}
                  onChange={(checked) =>
                    updateFilters({
                      isNotFirstFloor: checked,
                      floorFrom: floorFrom === '1' ? '2' : floorFrom,
                    })
                  }
                >
                  Не первый
                </CheckboxButton>
                <CheckboxButton
                  isChecked={isNotLastFloor}
                  onChange={(checked) =>
                    updateFilters({
                      isNotLastFloor: checked,
                      isLastFloor: false,
                    })
                  }
                >
                  Не последний
                </CheckboxButton>
                <CheckboxButton
                  isChecked={isLastFloor}
                  onChange={(checked) =>
                    updateFilters({
                      isLastFloor: checked,
                      isNotLastFloor: false,
                    })
                  }
                >
                  Последний
                </CheckboxButton>
              </div>
              <InputFromTo
                label="Этажей в Доме"
                values={{
                  from: maxFloorsFrom,
                  to: maxFloorsTo,
                }}
                onChange={({ from, to }) => updateFilters({ maxFloorsFrom: from, maxFloorsTo: to })}
                minMax={{
                  max: 50,
                  min: 1,
                }}
                wrapperClassName="flex-initial"
              />
              <Select
                isMulti
                label="Тип дома"
                values={houseType}
                options={[
                  { value: 'панельный', label: 'панельный' },
                  { value: 'монолитный', label: 'монолитный' },
                  { value: 'кирпичный', label: 'кирпичный' },
                  { value: 'блок-комнаты', label: 'блок-комнаты' },
                  { value: 'каркасно-блочный', label: 'каркасно-блочный' },
                  { value: 'силикатные блоки', label: 'силикатные блоки' },
                  { value: 'бревенчатый', label: 'бревенчатый' },
                ]}
                onChange={(selected) => updateFilters({ houseType: selected })}
              />
            </div>
            <Button className={clsx('self-end', 'flex-1')} onClick={applyFilters}>
              Применить
            </Button>
          </section>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(FlatsFilter);
