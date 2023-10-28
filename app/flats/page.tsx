import React from 'react';

import FlatsFilters from '@/components/Filters/Flats';
import FlatCard from '@/components/ProductCard/FlatCard';
import { getFiltersData } from '@/services/filters';
import { getFlats } from '@/services/flats';

type FlatsProps = {
  searchParams: Record<string, string | string[]>;
};

const Flats = async ({ searchParams }: FlatsProps) => {
  const [filters, flats] = await Promise.all([getFiltersData(), getFlats(searchParams)]);

  console.log('Flats was found: ', flats.length);
  return (
    <>
      <FlatsFilters data={filters} />
      {/* {flats.map((flat) => (
        <FlatCard flatItem={flat} key={flat.id} />
      ))} */}
    </>
  );
};

export default Flats;
