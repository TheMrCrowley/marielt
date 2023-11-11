import clsx from 'clsx';
import React from 'react';

import Select from '@/src/components/common/Select';
import AreaFilter from '@/src/components/filters/AreaFilter';
import KitchenAreaFilter from '@/src/components/filters/KitchenAreaFilter';
import LivingAreaFilter from '@/src/components/filters/LivingAreaFilter';
import { ceilingHeightValues } from '@/src/enums/FlatsFilters';
import { useFlatsFilter } from '@/src/store/flatsFilters';

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
        isMulti={false}
        label="Высота Потолков"
        subLabel="м"
        placeholderPrefix="От"
        items={ceilingHeightValues}
        values={ceilingHeight}
        onChange={(height) => updateFilters({ ceilingHeight: height })}
        wrapperClassName="md:basis-1/5 basis-full"
      />
    </div>
  );
};

export default ExpandedAreaFilter;
