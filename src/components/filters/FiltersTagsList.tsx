import clsx from 'clsx';
import React from 'react';

import Chip from '@/src/components/common/Chip';
import { FlatsFiltersType } from '@/src/store/flatsFilters';

interface FiltersTagsListProps {
  tags: FlatsFiltersType['tags'];
  filters: FlatsFiltersType['filters'];
  updateFilters: FlatsFiltersType['updateFilters'];
  deleteTag: FlatsFiltersType['deleteTag'];
}

const FiltersTagsList = ({ deleteTag, filters, tags, updateFilters }: FiltersTagsListProps) => {
  const filtersList = Object.entries(tags).map(([key, value]) => {
    if (Array.isArray(value) && value.length) {
      return value.map(({ label, value: filterValue }) => (
        <Chip
          label={label}
          onDelete={() => {
            updateFilters({
              [key]: (filters[key as keyof FlatsFiltersType['filters']] as string[]).filter(
                (item) => item !== filterValue,
              ),
            });
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
            updateFilters({ [key]: '' });
            if (deleteTag) {
              deleteTag(key as keyof FlatsFiltersType['filters']);
            }
          }}
          key={`filters-list-filter-tag-string-item-${key}-${value}`}
        />
      );
    }
  });

  return (
    <section
      className={clsx('flex', 'max-w-[1400px]', 'flex-auto', 'flex-wrap', 'gap-3', 'w-full')}
    >
      {filtersList}
    </section>
  );
};

export default FiltersTagsList;
