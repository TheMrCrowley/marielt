import { useContext } from 'react';

import { FlatsFiltersContext } from '@/components/Filters/Flats/FlatsContextProvider';
import Select from '@/components/Select';

const MicroDistrictFilter = () => {
  const {
    filters: { microDistrict: selectedMicroDistricts },
    data: { microDistrict: microDistrictsOptions },
    updateFilters,
  } = useContext(FlatsFiltersContext);

  if (!microDistrictsOptions) {
    return null;
  }

  return (
    <Select
      label="Микрорайон"
      isMulti
      options={microDistrictsOptions.map((microDistrict) => ({
        label: microDistrict,
        value: microDistrict,
      }))}
      values={selectedMicroDistricts}
      onChange={(selected) =>
        updateFilters({
          microDistrict: selected,
        })
      }
    />
  );
};

export default MicroDistrictFilter;
