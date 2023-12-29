import React from 'react';

import Select from '@/src/components/common/Select';

interface DistanceFilterProps {
  distance: string;
  onChange: ({ distance }: { distance: string }) => void;
}

const DistanceFilter = ({ distance, onChange }: DistanceFilterProps) => {
  return (
    <Select
      isMulti={false}
      label="Расстояние от МКАД"
      items={[
        {
          value: '50',
          label: 'До 50 км.',
        },
        {
          value: '100',
          label: 'До 100 км.',
        },
        {
          value: '150',
          label: 'До 150 км.',
        },
        {
          value: '200',
          label: 'До 200 км.',
        },
      ]}
      values={distance}
      onChange={(selected) =>
        onChange({
          distance: selected,
        })
      }
      wrapperClassName="lg:basis-1/4 sm:basis-1/2 basis-full"
    />
  );
};

export default DistanceFilter;
