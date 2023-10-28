import { useContext } from 'react';

import { FlatsFiltersContext } from '@/components/Filters/Flats/FlatsContextProvider';
import InputFromTo from '@/components/InputFromTo';

const AreaFilter = () => {
  const {
    filters: { areaFrom, areaTo },
    updateFilters,
  } = useContext(FlatsFiltersContext);

  return (
    <InputFromTo
      label="Площадь"
      subLabel={
        <span>
          м <sup>2</sup>
        </span>
      }
      values={{
        from: areaFrom,
        to: areaTo,
      }}
      onChange={({ from, to }) =>
        updateFilters({
          areaFrom: from,
          areaTo: to,
        })
      }
    />
  );
};

export default AreaFilter;
