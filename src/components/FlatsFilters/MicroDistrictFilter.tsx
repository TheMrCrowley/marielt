import { useMemo } from 'react';

import Select from '@/src/components/common/Select';
import { useFlatsFilter } from '@/src/store/flatsFilters';

const MicroDistrictFilter = () => {
  const {
    filters: { microDistrict: selectedMicroDistricts, district: selectedDistricts },
    data: { microDistrict: microDistrictsOptions, district: districtsData },
    updateFilters,
  } = useFlatsFilter();

  const dataToRender = useMemo(() => {
    const filtered = microDistrictsOptions?.filter((microDistrictsOption) => {
      const belongTo = new Set(
        districtsData
          ?.filter((initialDistrict) => selectedDistricts.includes(initialDistrict.districtName))
          .map((item) => item.microdistricts)
          .flat()
          .map((item) => item.microdistrictId),
      );

      return belongTo.has(microDistrictsOption.microDistrictId);
    });

    return filtered?.length ? filtered : microDistrictsOptions;
  }, [selectedDistricts]);

  if (!dataToRender) {
    return null;
  }

  return (
    <Select
      label="Микрорайон"
      isMulti={true}
      items={dataToRender.map((microDistrict) => ({
        label: microDistrict.microDistrictName,
        value: microDistrict.microDistrictName,
      }))}
      values={selectedMicroDistricts}
      onChange={(selected) =>
        updateFilters({
          microDistrict: selected,
        })
      }
      wrapperClassName="flex-auto"
    />
  );
};

export default MicroDistrictFilter;
