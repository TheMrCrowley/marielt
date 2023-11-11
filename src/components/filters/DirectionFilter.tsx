import React from 'react';

import Select from '@/src/components/common/Select';

interface DirectionFilterProps {
  directions: string[];
  values: string[];
  onChange: ({ directions }: { directions: string[] }) => void;
}

const DirectionFilter = ({ directions, onChange, values }: DirectionFilterProps) => {
  return (
    <Select
      label="Направление"
      isMulti={true}
      items={directions.map((option) => ({
        label: option,
        value: option,
      }))}
      values={values}
      onChange={(selected) =>
        onChange({
          directions: selected,
        })
      }
      wrapperClassName="lg:basis-1/4 sm:basis-1/2 basis-full"
    />
  );
};

export default DirectionFilter;
