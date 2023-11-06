import { useMemo } from 'react';

import Select from '@/components/Select';
import { useFlatsFilter } from '@/store/flatsFilters';

const DistrictFilter = () => {
  const {
    data: { district: districtsOptions, microDistrict: microDistrictData },
    filters: { district: selectedDistricts, microDistrict: selectedMicroDistricts },
    updateFilters,
  } = useFlatsFilter();

  const dataToRender = useMemo(() => {
    const filtered = districtsOptions?.filter((district) => {
      const belongTo = new Set(
        microDistrictData
          ?.filter((initialMicroDistrict) =>
            selectedMicroDistricts.includes(initialMicroDistrict.microDistrictName),
          )
          .map((item) => item.districts.districtId),
      );

      return belongTo.has(district.districtId);
    });

    return filtered?.length ? filtered : districtsOptions;
  }, [selectedMicroDistricts]);

  if (!dataToRender) {
    return null;
  }

  return (
    <Select
      label="Район"
      isMulti={true}
      items={dataToRender.map((district) => ({
        label: district.districtName,
        value: district.districtName,
      }))}
      values={selectedDistricts}
      onChange={(selected) =>
        updateFilters({
          district: selected,
        })
      }
      wrapperClassName="flex-auto"
    />
  );
};

export default DistrictFilter;
