import clsx from 'clsx';
import React from 'react';

import CheckboxButton from '@/components/CheckboxButton';
import { CommercialFloorValues, commercialFloorOptions } from '@/enums/CommercialFilters';
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
          {commercialFloorOptions[CommercialFloorValues.First]}
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
          {commercialFloorOptions[CommercialFloorValues.Ground]}
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
          {commercialFloorOptions[CommercialFloorValues.Last]}
        </CheckboxButton>
      )}
    </div>
  );
};

export default CommercialFloorFilter;
