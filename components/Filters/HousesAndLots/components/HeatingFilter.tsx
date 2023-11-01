import React from 'react';

import Select from '@/components/Select';

interface HeatingFilterProps {
  heating: string[];
  onChange: (data: { heating: string[] }) => void;
}

const HeatingFilter = ({ heating, onChange }: HeatingFilterProps) => {
  return (
    <Select
      options={[
        { label: 'паровое', value: 'паровое' },
        { label: 'отопление на газу', value: 'отопление на газу' },
        { label: 'центральное', value: 'центральное' },
        { label: 'печное', value: 'печное' },
        { label: 'паровое на газу', value: 'паровое на газу' },
        { label: 'паровое на жидком топливе', value: 'паровое на жидком топливе' },
        { label: 'паровое на твердом топливе', value: 'паровое на твердом топливе' },
        { label: 'электрическое', value: 'электрическое' },
        { label: 'альтернативные источники', value: 'альтернативные источники' },
        { label: 'нет', value: 'нет' },
      ]}
      isMulti
      values={heating}
      label="Отопление"
      onChange={(selected) => onChange({ heating: selected })}
      wrapperClassName="basis-3/12 shrink"
    />
  );
};

export default HeatingFilter;
