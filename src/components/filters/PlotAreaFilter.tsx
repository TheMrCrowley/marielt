import React from 'react';

import InputFromTo from '@/src/components/common/InputFromTo';

interface PlotAreaFilterProps {
  plotAreaFrom: string;
  plotAreaTo: string;
  onChange: (data: { plotAreaFrom: string; plotAreaTo: string }) => void;
}

const PlotAreaFilter = ({ plotAreaFrom, onChange, plotAreaTo }: PlotAreaFilterProps) => {
  return (
    <InputFromTo
      label="Площадь участка"
      subLabel="сот."
      values={{
        from: plotAreaFrom,
        to: plotAreaTo,
      }}
      onChange={({ from, to }) => {
        onChange({
          plotAreaFrom: from,
          plotAreaTo: to,
        });
      }}
    />
  );
};

export default PlotAreaFilter;
