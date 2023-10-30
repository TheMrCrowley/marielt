import { RefObject, useEffect, useMemo, useState } from 'react';

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
  selected: string[];
  isOpen: boolean;
  toggleSelect: () => void;
  formattedOptions: OptionItemProps[];
};

export const useSelect: UseSelectSignature = ({ onChange, options, isMulti, values }) => {
  const [selected, setSelected] = useState<string[]>(values);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const wrapperRef = useClickOutside(() => {
    setIsOpen(false);
  });

  const handleClickOption = (value: string) => {
    const isSelected = !!selected.find((option) => option === value);

    if (isMulti) {
      if (isSelected) {
        setSelected(selected.filter((option) => option !== value));
      } else {
        setSelected([...selected, value]);
      }
    } else {
      if (isSelected) {
        setSelected(selected.filter((option) => option !== value));
      } else {
        setSelected([value]);
        setIsOpen(false);
      }
    }
  };

  const formattedOptions = useMemo<OptionItemProps[]>(() => {
    return options.map((option) => {
      const isSelected = getIsItemSelected(selected, option.value);

      return {
        ...option,

        isSelected,
        onClick: handleClickOption,
      };
    });
  }, [selected, options]);

  // TODO: fix this
  useEffect(() => {
    setSelected(values);
  }, [values]);

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return {
    wrapperRef,
    selected,
    isOpen,
    toggleSelect: () => setIsOpen(!isOpen),
    formattedOptions,
  };
};
