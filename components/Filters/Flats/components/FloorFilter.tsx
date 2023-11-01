import clsx from 'clsx';
import React from 'react';

import CheckboxButton from '@/components/CheckboxButton';
import InputFromTo from '@/components/InputFromTo';
import { useFlatsFilter } from '@/store/flatsFilters';

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
      <div className={clsx('flex', 'items-end', 'gap-x-2', 'gap-y-4', 'flex-wrap')}>
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
        <div className={clsx('flex', 'gap-x-3', 'gap-y-4', 'min-w-min', 'flex-wrap')}>
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