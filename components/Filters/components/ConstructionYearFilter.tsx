import React from 'react';

import InputFromTo from '@/components/InputFromTo';

interface ConstructionYearFilterProps {
  constructionYearFrom: string;
  constructionYearTo: string;
  onChange: (data: { constructionYearFrom: string; constructionYearTo: string }) => void;
}

const ConstructionYearFilter = ({
  constructionYearFrom,
  constructionYearTo,
  onChange,
}: ConstructionYearFilterProps) => {
  return (
    <InputFromTo
      label="Год Постройки"
      values={{
        from: constructionYearFrom,
        to: constructionYearTo,
      }}
      onChange={({ from, to }) => onChange({ constructionYearFrom: from, constructionYearTo: to })}
      maxLength={4}
    />
  );
};

export default ConstructionYearFilter;
