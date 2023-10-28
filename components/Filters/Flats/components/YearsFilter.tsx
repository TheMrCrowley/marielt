import React, { useContext } from 'react';

import { FlatsFiltersContext } from '@/components/Filters/Flats/FlatsContextProvider';
import InputFromTo from '@/components/InputFromTo';

const YearsFilter = () => {
  const {
    filters: { renovationYearFrom, renovationYearTo, constructionYearFrom, constructionYearTo },
    updateFilters,
  } = useContext(FlatsFiltersContext);

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
      />
    </>
  );
};

export default YearsFilter;
