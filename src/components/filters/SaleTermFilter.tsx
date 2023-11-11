import React from 'react';

import Select from '@/src/components/common/Select';
import { SaleTermValues, saleTermOptions } from '@/src/enums/FlatsFilters';

interface SaleTermFilterProps {
  saleTerm: SaleTermValues[];
  onChange: (data: { saleTerm: SaleTermValues[] }) => void;
}

const SaleTermFilter = ({ saleTerm, onChange }: SaleTermFilterProps) => {
  return (
    <Select
      isMulti={true}
      label="Условия Сделки"
      values={saleTerm}
      onChange={(selected) =>
        onChange({
          saleTerm: selected as SaleTermValues[],
        })
      }
      items={saleTermOptions}
      wrapperClassName="md:basis-3/12 basis-full shrink"
    />
  );
};

export default SaleTermFilter;
