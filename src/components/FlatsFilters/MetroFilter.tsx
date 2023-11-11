import Select from '@/src/components/common/Select';
import { useFlatsFilter } from '@/src/store/flatsFilters';

const MetroFilter = () => {
  const {
    filters: { metro: selectedMetro },
    data: { metro: metroOptions },
    updateFilters,
  } = useFlatsFilter();

  if (!metroOptions) {
    return null;
  }

  return (
    <Select
      label="Метро"
      isMulti={true}
      items={metroOptions.map((station) => ({
        label: station,
        value: station,
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
