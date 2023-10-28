import ButtonGroup from '@/components/ButtonGroup';
import { RoominessValues, roominessOptions } from '@/enums/FlatsFilters';
import { useFlatsFilter } from '@/store/flatsFilters';

const RoominessFilter = () => {
  const {
    filters: { roominess },
    updateFilters,
  } = useFlatsFilter();

  return (
    <ButtonGroup
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
