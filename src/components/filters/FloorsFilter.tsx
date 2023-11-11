import React from 'react';

import InputFromTo from '@/src/components/common/InputFromTo';

interface FloorsFilterProps {
  floorFrom: string;
  floorTo: string;
  onChange: (data: { floorFrom: string; floorTo: string }) => void;
}

const FloorsFilter = ({ floorFrom, floorTo, onChange }: FloorsFilterProps) => {
  return (
    <InputFromTo
      label="Этаж"
      values={{
        from: floorFrom,
        to: floorTo,
      }}
      onChange={({ from, to }) =>
        onChange({
          floorFrom: from,
          floorTo: to,
        })
      }
      minMax={{
        max: 50,
        min: 1,
      }}
    />
  );
};

export default FloorsFilter;
