import React from 'react';

import InputFromTo from '@/components/InputFromTo';

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
      subLabel={
        <span>
          м <sup>2</sup>
        </span>
      }
      values={{
        from: kitchenAreaFrom,
        to: kitchenAreaTo,
      }}
      onChange={({ from, to }) => onChange({ kitchenAreaFrom: from, kitchenAreaTo: to })}
    />
  );
};

export default KitchenAreaFilter;
