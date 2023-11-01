import React from 'react';

import Select from '@/components/Select';

interface WallMaterialFilterProps {
  wallMaterial: string[];
  onChange: (data: { wallMaterial: string[] }) => void;
}

const WallMaterialFilter = ({ onChange, wallMaterial }: WallMaterialFilterProps) => {
  return (
    <Select
      label="Материал Стен"
      options={[
        { label: 'кирпич', value: 'кирпич' },
        { label: 'облицовочный кирпич', value: 'облицовочный кирпич' },
        { label: 'панельный', value: 'панельный' },
        { label: 'блочный', value: 'блочный' },
        { label: 'дерево', value: 'дерево' },
        { label: 'дерево, обложено кирпичом', value: 'дерево, обложено кирпичом' },
        { label: 'красный кирпич', value: 'красный кирпич' },
        { label: 'белый кирпич', value: 'белый кирпич' },
        { label: 'блок газосиликатный', value: 'блок газосиликатный' },
        { label: 'керамзитбетон', value: 'керамзитбетон' },
        { label: 'шлакобетон', value: 'шлакобетон' },
        { label: 'сруб', value: 'сруб' },
        { label: 'брус профилированный', value: 'брус профилированный' },
        { label: 'брус оцилиндрованный', value: 'брус оцилиндрованный' },
        { label: 'брус клееный', value: 'брус клееный' },
        { label: 'каркасно-засыпной', value: 'каркасно-засыпной' },
        { label: 'сборно-щитовой', value: 'сборно-щитовой' },
        { label: 'каркасный деревянный', value: 'каркасный деревянный' },
        { label: 'монолитно-каркасный', value: 'монолитно-каркасный' },
      ]}
      isMulti
      values={wallMaterial}
      onChange={(selected) => onChange({ wallMaterial: selected })}
      wrapperClassName="basis-3/12 shrink"
    />
  );
};

export default WallMaterialFilter;
