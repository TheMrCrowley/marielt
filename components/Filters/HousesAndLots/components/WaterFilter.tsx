import React from 'react';

import Select from '@/components/Select';

interface WaterFilterProps {
  water: string[];
  onChange: (data: { water: string[] }) => void;
}

const WaterFilter = ({ onChange, water }: WaterFilterProps) => {
  return (
    <Select
      label="Вода"
      isMulti
      options={[
        { label: 'горячая', value: 'горячая' },
        { label: 'холодная', value: 'холодная' },
        { label: 'рядом', value: 'рядом' },
        { label: 'рядом колодец', value: 'рядом колодец' },
        { label: 'рядом водопровод', value: 'рядом водопровод' },
        { label: 'центральный водопровод', value: 'центральный водопровод' },
        { label: 'скважина', value: 'скважина' },
        { label: 'колодец', value: 'колодец' },
        { label: 'нет', value: 'нет' },
        { label: 'сезонная', value: 'сезонная' },
      ]}
      onChange={(selected) => onChange({ water: selected })}
      values={water}
      wrapperClassName="basis-1/5 shrink"
    />
  );
};

export default WaterFilter;
