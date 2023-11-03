import React from 'react';

import Select from '@/components/Select';
import { SaleTermValues, saleTermOptions } from '@/enums/FlatsFilters';

interface SaleTermFilterProps {
  saleTerm: SaleTermValues[];
  onChange: (data: { saleTerm: SaleTermValues[] }) => void;
}

const SaleTermFilter = ({ saleTerm, onChange }: SaleTermFilterProps) => {
  return (
    <Select
      isMulti
      label="Условия Сделки"
      values={saleTerm}
      onChange={(selected) =>
        onChange({
          saleTerm: selected as SaleTermValues[],
        })
      }
      options={saleTermOptions}
      wrapperClassName="md:basis-3/12 basis-full shrink"
    />
  );
};

export default SaleTermFilter;
