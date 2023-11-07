import clsx from 'clsx';
import React from 'react';

import CheckboxButton from '@/components/CheckboxButton';
import { useCommercialFilters } from '@/store/commercialFilters';

interface CommercialFloorFilterProps {
  floorTypes: {
    isFirstFloor: boolean;
    isGroundFloor: boolean;
    isLastFloor: boolean;
  };
}

const CommercialFloorFilter = ({ floorTypes }: CommercialFloorFilterProps) => {
  const {
    filters: { isFirstFloor, isGroundFloor, isLastFloor },
    updateFilters,
  } = useCommercialFilters();

  return (
    <div className={clsx('flex', 'gap-8', 'min-w-min', 'flex-wrap')}>
      {floorTypes.isFirstFloor && (
        <CheckboxButton
          isChecked={isFirstFloor}
          onChange={(checked) =>
            updateFilters({
              isFirstFloor: checked,
            })
          }
        >
          Первый
        </CheckboxButton>
      )}
      {floorTypes.isGroundFloor && (
        <CheckboxButton
          isChecked={isGroundFloor}
          onChange={(checked) =>
            updateFilters({
              isGroundFloor: checked,
            })
          }
        >
          Цокольный
        </CheckboxButton>
      )}
      {floorTypes.isLastFloor && (
        <CheckboxButton
          isChecked={isLastFloor}
          onChange={(checked) =>
            updateFilters({
              isLastFloor: checked,
            })
          }
        >
          Последний
        </CheckboxButton>
      )}
    </div>
  );
};

export default CommercialFloorFilter;
