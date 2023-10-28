import Select from '@/components/Select';
import { useFlatsFilter } from '@/store/flatsFilters';

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
