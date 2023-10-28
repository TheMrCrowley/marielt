import clsx from 'clsx';
import React, { useContext } from 'react';

import CheckboxButton from '@/components/CheckboxButton';
import { FlatsFiltersContext } from '@/components/Filters/Flats/FlatsContextProvider';
import InputFromTo from '@/components/InputFromTo';

const FloorFilter = () => {
  const {
    updateFilters,
    filters: {
      floorFrom,
      floorTo,
      isNotFirstFloor,
      isLastFloor,
      isNotLastFloor,
      maxFloorsFrom,
      maxFloorsTo,
    },
  } = useContext(FlatsFiltersContext);

  return (
    <>
      <div className={clsx('flex', 'items-end', 'gap-x-2')}>
        <InputFromTo
          label="Этаж"
          values={{
            from: floorFrom,
            to: floorTo,
          }}
          onChange={({ from, to }) =>
            updateFilters({
              floorFrom: from,
              floorTo: to,
            })
          }
          minMax={{
            max: 50,
            min: 1,
          }}
        />
        <CheckboxButton
          isChecked={isNotFirstFloor}
          onChange={(checked) =>
            updateFilters({
              isNotFirstFloor: checked,
              floorFrom: floorFrom === '1' ? '2' : floorFrom,
            })
          }
        >
          Не первый
        </CheckboxButton>
        <CheckboxButton
          isChecked={isNotLastFloor}
          onChange={(checked) =>
            updateFilters({
              isNotLastFloor: checked,
              isLastFloor: false,
            })
          }
        >
          Не последний
        </CheckboxButton>
        <CheckboxButton
          isChecked={isLastFloor}
          onChange={(checked) =>
            updateFilters({
              isLastFloor: checked,
              isNotLastFloor: false,
            })
          }
        >
          Последний
        </CheckboxButton>
      </div>
      <InputFromTo
        label="Этажей в Доме"
        values={{
          from: maxFloorsFrom,
          to: maxFloorsTo,
        }}
        onChange={({ from, to }) => updateFilters({ maxFloorsFrom: from, maxFloorsTo: to })}
        minMax={{
          max: 50,
          min: 1,
        }}
        wrapperClassName="flex-initial"
      />
    </>
  );
};

export default FloorFilter;
