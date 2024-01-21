'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Select from '@/src/components/common/Select';
import {
  SortLabels,
  SortValues,
  sortLabelMap,
  sortOptions,
  sortQueryMap,
} from '@/src/enums/SortOptions';

const SortSelect = () => {
  const router = useRouter();

  const [sortType, setSortType] = useState<SortLabels>(
    sortLabelMap[new URLSearchParams(location.search).get('sort') as SortValues] ||
      SortLabels.DateDesc,
  );

  useEffect(() => {
    const newParam = sortQueryMap[sortType];
    if (newParam) {
      const pathname = location.pathname;
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('sort', newParam);

      router.push(pathname + '?' + searchParams.toString());
    }
  }, [sortType]);

  return (
    <div>
      <Select
        isMulti={false}
        items={sortOptions}
        onChange={(value) => setSortType(value as SortLabels)}
        values={sortType}
      />
    </div>
  );
};

export default SortSelect;
