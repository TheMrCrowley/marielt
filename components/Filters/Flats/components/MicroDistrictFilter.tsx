import Select from '@/components/Select';
import { useFlatsFilter } from '@/store/flatsFilters';

const MicroDistrictFilter = () => {
  const {
    filters: { microDistrict: selectedMicroDistricts },
    data: { microDistrict: microDistrictsOptions },
    updateFilters,
  } = useFlatsFilter();

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
