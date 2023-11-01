import React from 'react';

import InputFromTo from '@/components/InputFromTo';

interface ReadinessFilterProps {
  readinessFrom: string;
  readinessTo: string;
  onChange: (data: { readinessFrom: string; readinessTo: string }) => void;
}

const ReadinessFilter = ({ onChange, readinessFrom, readinessTo }: ReadinessFilterProps) => {
  return (
    <InputFromTo
      label="Готовность"
      subLabel="%"
      values={{
        from: readinessFrom,
        to: readinessTo,
      }}
      minMax={{
        min: 0,
        max: 100,
      }}
      onChange={({ from, to }) => onChange({ readinessFrom: from, readinessTo: to })}
    />
  );
};

export default ReadinessFilter;
