import React from 'react';

import Select from '@/components/Select';
import { SaleTermValues, saleTermOptions } from '@/enums/FlatsFilters';
import { useFlatsFilter } from '@/store/flatsFilters';

const SaleTermFilter = () => {
  const {
    filters: { saleTerm },
    updateFilters,
  } = useFlatsFilter();

  return (
    <Select
      isMulti
      label="Условия Сделки"
      values={saleTerm}
      onChange={(selected) =>
        updateFilters({
          saleTerm: selected as SaleTermValues[],
        })
      }
      options={saleTermOptions}
    />
  );
};

export default SaleTermFilter;
