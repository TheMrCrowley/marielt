import React from 'react';

import FlatsFilters from '@/components/Filters/Flats';
import FlatsList from '@/components/Filters/Flats/FlatsList';
import { getFlatsFiltersData } from '@/services/filters';
import { getFlats } from '@/services/flats';

type FlatsProps = {
  searchParams: Record<string, string | string[]>;
};

const Flats = async ({ searchParams }: FlatsProps) => {
  const [{ district, metro, microDistrict }, { flats, pagination }] = await Promise.all([
    getFlatsFiltersData(),
    getFlats(searchParams),
  ]);

  console.log('Flats was found: ', flats.length);
  return (
    <>
      <FlatsFilters
        data={{
          district,
          metro,
          microDistrict,
        }}
      />
      <FlatsList flats={flats} pagination={pagination} />
    </>
  );
};

export default Flats;
