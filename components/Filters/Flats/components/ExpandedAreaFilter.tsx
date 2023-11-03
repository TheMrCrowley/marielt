import clsx from 'clsx';
import React from 'react';

import AreaFilter from '@/components/Filters/components/AreaFilter';
import KitchenAreaFilter from '@/components/Filters/components/KitchenAreaFilter';
import LivingAreaFilter from '@/components/Filters/components/LivingAreaFilter';
import Select from '@/components/Select';
import { ceilingHeightValues } from '@/enums/FlatsFilters';
import { useFlatsFilter } from '@/store/flatsFilters';

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
  } = useFlatsFilter();

  return (
    <div className={clsx('flex', 'w-full', 'justify-start', 'items-end', 'gap-8', 'flex-wrap')}>
      <AreaFilter areaFrom={areaFrom} areaTo={areaTo} onChange={updateFilters} />
      <LivingAreaFilter
        livingAreaFrom={livingAreaFrom}
        livingAreaTo={livingAreaTo}
        onChange={updateFilters}
      />
      <KitchenAreaFilter
        kitchenAreaFrom={kitchenAreaFrom}
        kitchenAreaTo={kitchenAreaTo}
        onChange={updateFilters}
      />
      <Select
        label="Высота Потолков"
        subLabel="м"
        placeholder="Выбрать"
        placeholderPrefix="От"
        options={ceilingHeightValues}
        values={[ceilingHeight]}
        onChange={([height]) => updateFilters({ ceilingHeight: height })}
        wrapperClassName="md:basis-1/5 basis-full"
      />
    </div>
  );
};

export default ExpandedAreaFilter;
