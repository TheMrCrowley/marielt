import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import CheckboxButton from '@/components/CheckboxButton';
import InputWrapper, { InputWrapperProps } from '@/components/InputWrapper';

interface CheckboxGroupProps<T extends boolean> extends InputWrapperProps {
  isMulti: T;
  onChange: (selected: T extends true ? string[] : string) => void;
  items: Array<{
    value: string;
    label: string;
  }>;
  values: T extends true ? string[] : string;
}

function CheckboxGroup<T extends boolean>({
  isMulti,
  label,
  onChange,
  subLabel,
  wrapperClassName,
  items,
  values,
}: CheckboxGroupProps<T>) {
  const [selected, setSelected] = useState<string[] | string>(values);

  const handleClick = (value: string) => {
    if (isMulti) {
      // string[]
      const isSelected = (selected as string[]).find((item) => item === value);
      if (isSelected) {
        setSelected((selected as string[]).filter((item) => item !== value));
      } else {
        setSelected((prev) => [...(prev as string[]), value]);
      }
    } else {
      // string
      setSelected(value);
    }
  };

  useEffect(() => {
    if (isMulti) {
      (onChange as (selected: string[]) => void)(selected as string[]);
    } else {
      (onChange as (selected: string) => void)(selected as string);
    }
  }, [selected]);

  const isValueChecked = (value: string) =>
    Array.isArray(selected) ? !!selected.find((item) => item === value) : selected === value;

  return (
    <InputWrapper label={label} subLabel={subLabel} wrapperClassName={wrapperClassName}>
      <div className={clsx('flex', 'gap-x-2')}>
        {items.map((item) => (
          <CheckboxButton
            key={Math.random() + 'checkboxGroup-checkBoxItem'}
            isChecked={isValueChecked(item.value)}
            onChange={() => handleClick(item.value)}
          >
            {item.label}
          </CheckboxButton>
        ))}
      </div>
    </InputWrapper>
  );
}

export default CheckboxGroup;
