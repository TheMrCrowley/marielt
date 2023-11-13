import clsx from 'clsx';
import React from 'react';

import CheckboxButton from '@/src/components/common/CheckboxButton';
import InputWrapper, { InputWrapperProps } from '@/src/components/common/InputWrapper';

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
  const handleClick = (value: string) => {
    if (isMulti) {
      // string[]
      const isSelected = (values as string[]).find((item) => item === value);
      if (isSelected) {
        (onChange as (selected: string[]) => void)(
          (values as string[]).filter((item) => item !== value),
        );
      } else {
        (onChange as (selected: string[]) => void)([...(values as string[]), value]);
      }
    } else {
      // string
      (onChange as (selected: string) => void)(value);
    }
  };

  const isValueChecked = (value: string) =>
    Array.isArray(values) ? !!values.find((item) => item === value) : values === value;

  return (
    <InputWrapper label={label} subLabel={subLabel} wrapperClassName={wrapperClassName}>
      <div className={clsx('flex', 'gap-2', 'flex-wrap', 'max-w-max')}>
        {items.map((item) => (
          <CheckboxButton
            key={`checkbox-group-checkbox-item-${label}-${item.label}-${item.value}`}
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
