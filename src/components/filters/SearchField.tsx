import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import Input from '@/src/components/common/Input/Input';
import InputWrapper from '@/src/components/common/InputWrapper';
import Loader from '@/src/components/common/Loader';
import Typography from '@/src/components/common/Typography';
import { getIsItemSelected } from '@/src/helpers/getIsItemSelected';
import { useClickOutside } from '@/src/hooks/useClickOutside';
import useDebounce from '@/src/hooks/useDebounce';
import { SearchResults } from '@/src/types/Filters';

interface SearchFieldProps {
  search: (value: string) => Promise<SearchResults>;
  onClick: (data: SearchResults) => void;
  values: SearchResults;
}

const getIsSearchResultsFound = (data: SearchResults): boolean =>
  (Object.values(data) as string[]).some((result) => !!result.length);

const defaultResults: SearchResults = {
  district_rb: [],
  locality: [],
  region: [],
  street: [],
};

const SearchOption = ({
  onClick,
  value,
  isSelected,
}: {
  value: string;
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={clsx(
        'max-w-full',
        'break-all',
        'px-2',
        'py-2',
        'border-solid',
        'border-b',
        'text-base',
        isSelected ? 'text-black' : 'text-white',
        'hover:bg-secondary',
        'hover:text-black',
        'hover: text-black',
        isSelected && 'bg-secondary',
        'hover:cursor-pointer',
        'first-letter:uppercase',
      )}
    >
      {value}
    </div>
  );
};

const SearchOptions = ({
  options,
  values,
  onOptionClick,
  label,
}: {
  options: string[];
  values: string[];
  onOptionClick: (streets: string[]) => void;
  label: string;
}) => {
  if (!options.length) {
    return null;
  }

  const handleClick = (value: string, isSelected: boolean) => {
    const updatedStreets = isSelected ? values.filter((v) => v !== value) : [...values, value];
    onOptionClick(updatedStreets);
  };

  return (
    <InputWrapper label={label} wrapperClassName="w-full">
      {options.map((option) => {
        const isSelected = getIsItemSelected(values, option);

        return (
          <SearchOption
            value={option}
            key={`search-item-${label}-option-${option}`}
            onClick={() => handleClick(option, isSelected)}
            isSelected={isSelected}
          />
        );
      })}
    </InputWrapper>
  );
};

const SearchField = ({ onClick, search, values }: SearchFieldProps) => {
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<SearchResults>(defaultResults);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const debouncedValue = useDebounce(value, 500);

  const resetStates = () => {
    setLoading(false);
    setNotFound(false);
    setOptions(defaultResults);
    setValue('');
    setVisible(false);
  };

  const wrapperRef = useClickOutside(() => setVisible(false));

  const getResults = async () => {
    setLoading(true);
    const result = await search(value);

    if (getIsSearchResultsFound(result)) {
      setOptions(result);
      setVisible(true);
    } else {
      setNotFound(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (value && value.length >= 3) {
      getResults();
      return;
    }

    resetStates();
  }, [debouncedValue]);

  const renderOptions = () => {
    return (
      <>
        <SearchOptions
          label="Адреса"
          onOptionClick={(streets) => {
            onClick({ ...values, street: streets });
          }}
          options={options.street}
          values={values.street}
        />
        <SearchOptions
          label="Области"
          onOptionClick={(regions) => {
            onClick({ ...values, region: regions });
          }}
          options={options.region}
          values={values.region}
        />
        <SearchOptions
          label="Районы"
          onOptionClick={(districts) => {
            onClick({ ...values, district_rb: districts });
          }}
          options={options.district_rb}
          values={values.district_rb}
        />
        <SearchOptions
          label="Населенные пункты"
          onOptionClick={(localities) => {
            onClick({ ...values, locality: localities });
          }}
          options={options.locality}
          values={values.locality}
        />
      </>
    );
  };

  return (
    <div
      ref={wrapperRef}
      className={clsx('md:w-1/2', 'w-full', 'relative')}
      onFocus={() => setVisible(true)}
    >
      <Input
        value={value}
        onChange={(val) => setValue(val)}
        placeholder="Введите Адрес, Район, Микрорайон"
      />
      {loading && (
        <div
          className={clsx(
            'w-full',
            'p-4',
            'flex',
            'justify-center',
            'items-center',
            'absolute',
            'z-10',
            'bg-[#4C4C4C]',
          )}
        >
          <Loader />
        </div>
      )}
      {notFound && (
        <div
          className={clsx(
            'w-full',
            'p-4',
            'flex',
            'justify-center',
            'items-center',
            'absolute',
            'z-10',
            'bg-[#4C4C4C]',
          )}
        >
          <Typography>По вашему запросу ничего не найдено!</Typography>
        </div>
      )}
      {!loading && !notFound && visible && getIsSearchResultsFound(options) && (
        <div
          className={clsx(
            'w-full',
            'p-4',
            'flex',
            'flex-col',
            'gap-8',
            'justify-center',
            'items-center',
            'absolute',
            'z-10',
            'bg-[#4C4C4C]',
          )}
        >
          {renderOptions()}
        </div>
      )}
    </div>
  );
};

export default SearchField;
