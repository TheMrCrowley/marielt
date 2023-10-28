import { useContext } from 'react';

import { FlatsFiltersContext } from '@/components/Filters/Flats/FlatsContextProvider';
import Select from '@/components/Select';

const MetroFilter = () => {
  const {
    filters: { metro: selectedMetro },
    data: { metro: metroOptions },
    updateFilters,
  } = useContext(FlatsFiltersContext);

  if (!metroOptions) {
    return null;
  }

  return (
    <Select
      label="Метро"
      isMulti
      options={metroOptions.map((station) => ({
        label: station,
        value: station,
      }))}
      values={selectedMetro}
      onChange={(selected) =>
        updateFilters({
          metro: selected,
        })
      }
    />
  );
};

export default MetroFilter;
