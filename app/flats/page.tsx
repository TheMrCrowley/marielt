import React from 'react';

import FlatsWithContext from '@/components/Filters/Flats';
import { getFiltersData } from '@/services/filters';
import { getFlats } from '@/services/flats';

type FlatsProps = {
  searchParams: Record<string, string | string[]>;
};

const Flats = async ({ searchParams }: FlatsProps) => {
  const [filters, flats] = await Promise.all([getFiltersData(), getFlats(searchParams)]);

  // console.log(searchParams);

  console.log(flats.length);
  return (
    <>
      <FlatsWithContext
        filtersData={{
          ...filters,
        }}
      />
    </>
  );
};

export default Flats;
