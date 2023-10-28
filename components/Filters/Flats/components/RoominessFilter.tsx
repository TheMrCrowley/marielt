import { useContext } from 'react';

import ButtonGroup from '@/components/ButtonGroup';
import { FlatsFiltersContext } from '@/components/Filters/Flats/FlatsContextProvider';
import { RoominessValues, roominessOptions } from '@/enums/FlatsFilters';

const RoominessFilter = () => {
  const {
    filters: { roominess },
    updateFilters,
  } = useContext(FlatsFiltersContext);

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
