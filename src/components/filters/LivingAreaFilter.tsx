import React from 'react';

import InputFromTo from '@/src/components/common/InputFromTo';

interface LivingAreaFilterProps {
  livingAreaFrom: string;
  livingAreaTo: string;
  onChange: (data: { livingAreaFrom: string; livingAreaTo: string }) => void;
}

const LivingAreaFilter = ({ livingAreaFrom, livingAreaTo, onChange }: LivingAreaFilterProps) => {
  return (
    <InputFromTo
      label="Площадь Жилая"
      subLabel={<span>м²</span>}
      values={{
        from: livingAreaFrom,
        to: livingAreaTo,
      }}
      onChange={({ from, to }) => onChange({ livingAreaFrom: from, livingAreaTo: to })}
    />
  );
};

export default LivingAreaFilter;
