import clsx from 'clsx';
import Image from 'next/image';
import React, { useContext, useState } from 'react';

import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';
import CheckboxButton from '@/components/CheckboxButton';
import CheckboxGroup from '@/components/CheckboxGroup';
import CurrencySwitch from '@/components/CurrencySwitch';
import InputFromTo from '@/components/InputFromTo';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import Switch from '@/components/Switch';
import Title from '@/components/Title';
import CrossIcon from '@/public/plus.svg';
import { finishingValues } from '@/types/Filters';

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
        label: district,
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

const ExpandedFlatsFilter = () => {};

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
      areaFrom,
      areaTo,
      livingAreaFrom,
      livingAreaTo,
      kitchenAreaFrom,
      kitchenAreaTo,
      bathroom,
      finishing,
      constructionYearFrom,
      constructionYearTo,
      renovationYearFrom,
      renovationYearTo,
      saleTerm,
      furniture,
      parking,
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
          <section
            className={clsx(
              'flex',
              'flex-col',
              'w-full',
              'justify-between',
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
                wrapperClassName="flex-auto"
                isMulti
                label="Тип дома"
                values={houseType}
                options={[
                  //TODO move it somewhere and keep in one place
                  { value: 'панельный', label: 'панельный' },
                  { value: 'монолитный', label: 'монолитный' },
                  { value: 'кирпичный', label: 'кирпичный' },
                  { value: 'блок-комнаты', label: 'блок-комнаты' },
                  { value: 'каркасно-блочный', label: 'каркасно-блочный' },
                  { value: 'силикатные блоки', label: 'силикатные блоки' },
                  { value: 'бревенчатый', label: 'бревенчатый' },
                ]}
                onChange={(selected) => updateFilters({ houseType: selected })}
                optionWidth="full"
              />
            </div>
            <div className={clsx('flex', 'w-full', 'justify-start', 'gap-x-8')}>
              <InputFromTo
                label="Площадь Общая"
                subLabel={
                  <span>
                    м <sup>2</sup>
                  </span>
                }
                values={{
                  from: areaFrom,
                  to: areaTo,
                }}
                onChange={({ from, to }) => updateFilters({ areaFrom: from, areaTo: to })}
              />
              <InputFromTo
                label="Площадь Жилая"
                subLabel={
                  <span>
                    м <sup>2</sup>
                  </span>
                }
                values={{
                  from: livingAreaFrom,
                  to: livingAreaTo,
                }}
                onChange={({ from, to }) =>
                  updateFilters({ livingAreaFrom: from, livingAreaTo: to })
                }
              />
              <InputFromTo
                label="Площадь Кухни"
                subLabel={
                  <span>
                    м <sup>2</sup>
                  </span>
                }
                values={{
                  from: kitchenAreaFrom,
                  to: kitchenAreaTo,
                }}
                onChange={({ from, to }) =>
                  updateFilters({ kitchenAreaFrom: from, kitchenAreaTo: to })
                }
              />
              <Select
                label="Высота Потолков"
                subLabel="м"
                placeholder="Выбрать"
                options={[
                  {
                    value: '2.5',
                    label: 'От 2,5 м',
                  },
                  {
                    value: '2.7',
                    label: 'От 2,7 м',
                  },
                  {
                    value: '3',
                    label: 'От 3 м',
                  },
                  {
                    value: '3.5',
                    label: 'От 3,5 м',
                  },
                  {
                    value: '4',
                    label: 'От 4 м',
                  },
                ]}
                onChange={([height]) => updateFilters({ ceilingHeight: height })}
                optionWidth="full"
              />
            </div>
            <div className={clsx('flex', 'w-full', 'justify-start', 'gap-x-8', 'items-end')}>
              <Select
                label="Ремонт"
                isMulti
                values={finishing}
                options={finishingValues.map((item) => ({
                  value: item,
                  label: item,
                }))}
                onChange={(selected) => updateFilters({ finishing: selected })}
              />
              <CheckboxGroup
                isMulti
                label="Санузел"
                values={bathroom}
                items={[
                  { label: 'Раздельный', value: 'separate' },
                  { label: 'Совмещенный', value: 'combined' },
                  { label: '2 и более', value: 'twoAndMore' },
                ]}
                onChange={(selected) => updateFilters({ bathroom: selected })}
              />
              <CheckboxGroup
                isMulti
                label="Балкон"
                values={bathroom}
                items={[
                  // TODO move to one place
                  { label: 'Есть', value: 'balcony' },
                  { label: 'Нет', value: 'none' },
                  { label: 'Лоджия', value: 'loggia' },
                ]}
                onChange={(selected) => updateFilters({ balcony: selected })}
              />
            </div>
            <div className={clsx('flex', 'w-full', 'justify-start', 'gap-x-8')}>
              <InputFromTo
                label="Год Ремонта"
                values={{
                  from: renovationYearFrom,
                  to: renovationYearTo,
                }}
                onChange={({ from, to }) =>
                  updateFilters({ renovationYearFrom: from, renovationYearTo: to })
                }
              />
              <InputFromTo
                label="Год Постройки"
                values={{
                  from: constructionYearFrom,
                  to: constructionYearTo,
                }}
                onChange={({ from, to }) =>
                  updateFilters({ constructionYearFrom: from, constructionYearTo: to })
                }
              />
              <Select
                label="Условия Сделки"
                values={saleTerm}
                onChange={(selected) =>
                  updateFilters({
                    saleTerm: selected,
                  })
                }
                options={[
                  { value: 'clear', label: 'чистая продажа' },
                  { value: 'change', label: 'обмен' },
                  { value: 'changeMoveOut', label: 'обмен - разъезд' },
                  { value: 'changeMoveIn', label: 'обмен - съезд' },
                ]}
              />
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
