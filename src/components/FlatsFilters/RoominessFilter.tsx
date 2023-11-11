import CheckboxGroup from '@/src/components/common/CheckboxGroup';
import { RoominessValues, roominessOptions } from '@/src/enums/FlatsFilters';
import { useFlatsFilter } from '@/src/store/flatsFilters';

const RoominessFilter = () => {
  const {
    filters: { roominess },
    updateFilters,
  } = useFlatsFilter();

  return (
    <CheckboxGroup
      isMulti={true}
      label="Комнатность"
      values={roominess}
      items={roominessOptions}
      onChange={(selected) =>
        updateFilters({
          roominess: selected as RoominessValues[],
        })
      }
    />
  );
};

export default RoominessFilter;
