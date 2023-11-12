import clsx from 'clsx';
import React from 'react';

import CheckboxButton from '@/src/components/common/CheckboxButton';
import InputFromTo from '@/src/components/common/InputFromTo';
import FloorsFilter from '@/src/components/filters/FloorsFilter';
import { useFlatsFilter } from '@/src/store/flatsFilters';

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
  } = useFlatsFilter();

  return (
    <>
      <div className={clsx('flex', 'items-end', 'gap-8', 'flex-wrap')}>
        <FloorsFilter floorFrom={floorFrom} floorTo={floorTo} onChange={updateFilters} />
        <div className={clsx('flex', 'gap-2', 'min-w-min', 'flex-wrap')}>
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
        wrapperClassName="flex-initial justify-end"
      />
    </>
  );
};

export default FloorFilter;
