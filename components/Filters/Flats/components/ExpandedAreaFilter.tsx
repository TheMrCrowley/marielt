import clsx from 'clsx';
import React, { useContext } from 'react';

import { FlatsFiltersContext } from '@/components/Filters/Flats/FlatsContextProvider';
import InputFromTo from '@/components/InputFromTo';
import Select from '@/components/Select';
import { ceilingHeightValues } from '@/enums/FlatsFilters';

const ExpandedAreaFilter = () => {
  const {
    filters: {
      areaFrom,
      areaTo,
      livingAreaFrom,
      livingAreaTo,
      kitchenAreaFrom,
      kitchenAreaTo,
      ceilingHeight,
    },
    updateFilters,
  } = useContext(FlatsFiltersContext);

  return (
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
        onChange={({ from, to }) => updateFilters({ livingAreaFrom: from, livingAreaTo: to })}
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
        onChange={({ from, to }) => updateFilters({ kitchenAreaFrom: from, kitchenAreaTo: to })}
      />
      <Select
        label="Высота Потолков"
        subLabel="м"
        placeholder="Выбрать"
        placeholderPrefix="От"
        options={ceilingHeightValues}
        values={[ceilingHeight]}
        onChange={([height]) => updateFilters({ ceilingHeight: height })}
        optionWidth="full"
      />
    </div>
  );
};

export default ExpandedAreaFilter;
