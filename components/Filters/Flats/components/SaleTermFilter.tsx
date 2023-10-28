import React, { useContext } from 'react';

import { FlatsFiltersContext } from '@/components/Filters/Flats/FlatsContextProvider';
import Select from '@/components/Select';
import { SaleTermValues, saleTermOptions } from '@/enums/FlatsFilters';

const SaleTermFilter = () => {
  const {
    filters: { saleTerm },
    updateFilters,
  } = useContext(FlatsFiltersContext);

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
