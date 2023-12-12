import { useMemo } from 'react';

import Select from '@/src/components/common/Select';
import { useFlatsFilter } from '@/src/store/flatsFilters';

const MetroFilter = () => {
  const {
    filters: { metro: selectedMetro, district: selectedDistricts },
    data: { metro: metroOptions, district: districtsData },
    updateFilters,
  } = useFlatsFilter();

  const dataToRender = useMemo(() => {
    const filtered = metroOptions?.filter((metroOption) => {
      const belongTo = new Set(
        districtsData
          ?.filter((initialDistrict) => selectedDistricts.includes(initialDistrict.districtName))
          .map((item) => item.metros)
          .flat()
          .map((item) => item.metroId),
      );

      return belongTo.has(metroOption.metroId);
    });

    return filtered?.length ? filtered : metroOptions;
  }, [selectedDistricts]);

  return (
    <Select
      label="Метро"
      isMulti={true}
      items={dataToRender.map((station) => ({
        label: station.metroName,
        value: station.metroName,
      }))}
      values={selectedMetro}
      onChange={(selected) =>
        updateFilters({
          metro: selected,
        })
      }
      wrapperClassName="flex-auto"
    />
  );
};

export default MetroFilter;
