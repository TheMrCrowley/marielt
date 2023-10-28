import { useContext } from 'react';

import { FlatsFiltersContext } from '@/components/Filters/Flats/FlatsContextProvider';
import Select from '@/components/Select';

const DistrictFilter = () => {
  const {
    data: { district: districtsOptions },
    filters: { district: selectedDistricts },
    updateFilters,
  } = useContext(FlatsFiltersContext);

  if (!districtsOptions) {
    return null;
  }

  return (
    <Select
      label="Район"
      isMulti
      options={districtsOptions.map((district) => ({
        label: district,
        value: district,
      }))}
      values={selectedDistricts}
      onChange={(selected) =>
        updateFilters({
          district: selected,
        })
      }
    />
  );
};

export default DistrictFilter;
