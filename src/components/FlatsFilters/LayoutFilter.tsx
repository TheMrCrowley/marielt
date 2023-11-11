import clsx from 'clsx';
import React from 'react';

import CheckboxGroup from '@/src/components/common/CheckboxGroup';
import Select from '@/src/components/common/Select';
import {
  BalconyValues,
  FinishingValues,
  balconyOptions,
  bathroomOptions,
  finishingOptions,
} from '@/src/enums/FlatsFilters';
import { useFlatsFilter } from '@/src/store/flatsFilters';

const LayoutFilter = () => {
  const {
    filters: { finishing, balcony, bathroom },
    updateFilters,
  } = useFlatsFilter();

  return (
    <div className={clsx('flex', 'w-full', 'justify-start', 'gap-8', 'items-end', 'flex-wrap')}>
      <Select
        label="Ремонт"
        isMulti={true}
        values={finishing}
        items={finishingOptions}
        onChange={(selected) => updateFilters({ finishing: selected as FinishingValues[] })}
        wrapperClassName="md:basis-1/5 basis-full"
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
