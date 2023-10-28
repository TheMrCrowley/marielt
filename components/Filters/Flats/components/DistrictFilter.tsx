import Select from '@/components/Select';
import { useFlatsFilter } from '@/store/flatsFilters';

const DistrictFilter = () => {
  const {
    data: { district: districtsOptions },
    filters: { district: selectedDistricts },
    updateFilters,
  } = useFlatsFilter();

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
