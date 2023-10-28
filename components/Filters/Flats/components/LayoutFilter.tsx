import clsx from 'clsx';
import React from 'react';

import CheckboxGroup from '@/components/CheckboxGroup';
import Select from '@/components/Select';
import {
  BalconyValues,
  FinishingValues,
  balconyOptions,
  bathroomOptions,
  finishingOptions,
} from '@/enums/FlatsFilters';
import { useFlatsFilter } from '@/store/flatsFilters';

const LayoutFilter = () => {
  const {
    filters: { finishing, balcony, bathroom },
    updateFilters,
  } = useFlatsFilter();

  return (
    <div className={clsx('flex', 'w-full', 'justify-start', 'gap-x-8', 'items-end')}>
      <Select
        label="Ремонт"
        isMulti
        values={finishing}
        options={finishingOptions}
        onChange={(selected) => updateFilters({ finishing: selected as FinishingValues[] })}
      />
      <CheckboxGroup
        isMulti
        label="Санузел"
        values={bathroom}
        items={bathroomOptions}
        onChange={(selected) => updateFilters({ bathroom: selected })}
      />
      <CheckboxGroup
        isMulti
        label="Балкон"
        values={balcony}
        items={balconyOptions}
        onChange={(selected) => updateFilters({ balcony: selected as BalconyValues[] })}
      />
    </div>
  );
};

export default LayoutFilter;
