import React from 'react';

import InputFromTo from '@/components/InputFromTo';

interface LivingAreaFilterProps {
  livingAreaFrom: string;
  livingAreaTo: string;
  onChange: (data: { livingAreaFrom: string; livingAreaTo: string }) => void;
}

const LivingAreaFilter = ({ livingAreaFrom, livingAreaTo, onChange }: LivingAreaFilterProps) => {
  return (
    <InputFromTo
      label="Площадь Жилая"
      subLabel={
        <span>
          м <sup>2</sup>
        </span>
      }
      values={{
        from: livingAreaFrom,
        to: livingAreaTo,
      }}
      onChange={({ from, to }) => onChange({ livingAreaFrom: from, livingAreaTo: to })}
    />
  );
};

export default LivingAreaFilter;
