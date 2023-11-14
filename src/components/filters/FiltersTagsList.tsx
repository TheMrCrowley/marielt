import clsx from 'clsx';
import React from 'react';

import Chip from '@/src/components/common/Chip';
import { FlatsFiltersType } from '@/src/store/flatsFilters';

interface FiltersTagsListProps {
  tags: Record<string, string | Array<{ value: string; label: string }>>;
  deleteTag: (key: string, value?: string) => void;
  reset: () => void;
}

const FiltersTagsList = ({ deleteTag, tags, reset }: FiltersTagsListProps) => {
  const filtersList = Object.entries(tags)
    .filter(
      ([, value]) =>
        (Array.isArray(value) && value.length) || (typeof value === 'string' && value.length),
    )
    .map(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        return value.map(({ label, value: filterValue }) => (
          <Chip
            label={label}
            onDelete={() => {
              deleteTag(key as keyof FlatsFiltersType['filters'], filterValue);
            }}
            key={`filters-list-filter-tag-array-item-${key}-${label}`}
          />
        ));
      }
      if (typeof value === 'string' && value) {
        return (
          <Chip
            label={value}
            onDelete={() => {
              if (deleteTag) {
                deleteTag(key as keyof FlatsFiltersType['filters']);
              }
            }}
            key={`filters-list-filter-tag-string-item-${key}-${value}`}
          />
        );
      }
    });

  if (!filtersList.length) {
    return null;
  }

  return (
    <section
      className={clsx('flex', 'max-w-[1400px]', 'flex-auto', 'flex-wrap', 'gap-3', 'w-full')}
    >
      <Chip label={'Очистить все'} onDelete={reset} />
      {filtersList}
    </section>
  );
};

export default FiltersTagsList;
