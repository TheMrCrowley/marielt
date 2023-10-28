import InputFromTo from '@/components/InputFromTo';
import { useFlatsFilter } from '@/store/flatsFilters';

const AreaFilter = () => {
  const {
    updateFilters,
    filters: { areaFrom, areaTo },
  } = useFlatsFilter();

  return (
    <InputFromTo
      label="Площадь"
      subLabel={
        <span>
          м <sup>2</sup>
        </span>
      }
      values={{
        from: areaFrom,
        to: areaTo,
      }}
      onChange={({ from, to }) => {
        updateFilters({
          areaFrom: from,
          areaTo: to,
        });
      }}
    />
  );
};

export default AreaFilter;
