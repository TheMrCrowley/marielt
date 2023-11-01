import React from 'react';

import ConstructionYearFilter from '@/components/Filters/components/ConstructionYearFilter';
import InputFromTo from '@/components/InputFromTo';
import { useFlatsFilter } from '@/store/flatsFilters';

const YearsFilter = () => {
  const {
    filters: { renovationYearFrom, renovationYearTo, constructionYearFrom, constructionYearTo },
    updateFilters,
  } = useFlatsFilter();

  return (
    <>
      <InputFromTo
        label="Год Ремонта"
        values={{
          from: renovationYearFrom,
          to: renovationYearTo,
        }}
        onChange={({ from, to }) =>
          updateFilters({ renovationYearFrom: from, renovationYearTo: to })
        }
        maxLength={4}
      />
      <ConstructionYearFilter
        constructionYearFrom={constructionYearFrom}
        constructionYearTo={constructionYearTo}
        onChange={updateFilters}
      />
    </>
  );
};

export default YearsFilter;
