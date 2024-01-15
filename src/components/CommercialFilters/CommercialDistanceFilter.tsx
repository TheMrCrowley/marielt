import React from 'react';

import Select from '@/src/components/common/Select';

interface CommercialDistanceFilterProps {
  distance: string;
  onChange: ({ distance }: { distance: string }) => void;
}

const CommercialDistanceFilter = ({ distance, onChange }: CommercialDistanceFilterProps) => {
  return (
    <Select
      isMulti={false}
      label="Расстояние до МКАД"
      items={[
        {
          value: '10',
          label: 'До 10 км.',
        },
        {
          value: '30',
          label: 'До 30 км.',
        },
        {
          value: '50',
          label: 'До 50 км.',
        },
        {
          value: '300',
          label: 'свыше 50 км.',
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

export default CommercialDistanceFilter;
