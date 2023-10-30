import React from 'react';

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
      <InputFromTo
        label="Год Постройки"
        values={{
          from: constructionYearFrom,
          to: constructionYearTo,
        }}
        onChange={({ from, to }) =>
          updateFilters({ constructionYearFrom: from, constructionYearTo: to })
        }
        maxLength={4}
      />
    </>
  );
};

export default YearsFilter;
