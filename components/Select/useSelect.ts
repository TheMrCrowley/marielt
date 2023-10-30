import { RefObject, useMemo, useState } from 'react';

import { getIsItemSelected } from '@/helpers/getIsItemSelected';
import { useClickOutside } from '@/helpers/useClickOutside';
import { OptionType } from '@/types/Option';

import { OptionItemProps } from './Option';

type UseSelectSignature = ({
  onChange,
  options,
  isMulti,
  values,
}: {
  onChange: (selected: string[]) => void;
  options: OptionType[];
  values: string[];
  isMulti: boolean;
}) => {
  wrapperRef: RefObject<HTMLDivElement>;
  isOpen: boolean;
  toggleSelect: () => void;
  formattedOptions: OptionItemProps[];
};

export const useSelect: UseSelectSignature = ({ onChange, options, isMulti, values }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const wrapperRef = useClickOutside(() => {
    setIsOpen(false);
  });

  const handleClickOption = (value: string) => {
    const isSelected = !!values.find((option) => option === value);

    if (isMulti) {
      if (isSelected) {
        onChange(values.filter((option) => option !== value));
      } else {
        onChange([...values, value]);
      }
    } else {
      if (isSelected) {
        onChange(values.filter((option) => option !== value));
      } else {
        onChange([value]);
        setIsOpen(false);
      }
    }
  };

  const formattedOptions = useMemo<OptionItemProps[]>(() => {
    return options.map((option) => {
      const isSelected = getIsItemSelected(values, option.value);

      return {
        ...option,

        isSelected,
        onClick: handleClickOption,
      };
    });
  }, [values, options]);

  return {
    wrapperRef,
    isOpen,
    toggleSelect: () => setIsOpen(!isOpen),
    formattedOptions,
  };
};
