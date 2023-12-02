import React from 'react';

import InputFromTo from '@/src/components/common/InputFromTo';

interface KitchenAreaFilterProps {
  kitchenAreaFrom: string;
  kitchenAreaTo: string;
  onChange: (data: { kitchenAreaFrom: string; kitchenAreaTo: string }) => void;
}

const KitchenAreaFilter = ({
  kitchenAreaFrom,
  kitchenAreaTo,
  onChange,
}: KitchenAreaFilterProps) => {
  return (
    <InputFromTo
      label="Площадь Кухни"
      subLabel="м²"
      values={{
        from: kitchenAreaFrom,
        to: kitchenAreaTo,
      }}
      onChange={({ from, to }) => onChange({ kitchenAreaFrom: from, kitchenAreaTo: to })}
    />
  );
};

export default KitchenAreaFilter;
