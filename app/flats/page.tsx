import React from 'react';

import FlatsFilters from '@/src/app-pages/FlatsPage/FlatsFilters';
import FlatsList from '@/src/app-pages/FlatsPage/FlatsList';
import FlatsMap from '@/src/app-pages/FlatsPage/FlatsMap';
import { getFlatsFiltersData } from '@/src/services/filtersDataServices';
import { getFlats } from '@/src/services/flatsServices';
import { ViewType } from '@/src/types/ViewType';

type FlatsProps = {
  searchParams: Record<string, string | string[]>;
};

const Flats = async ({ searchParams }: FlatsProps) => {
  const [data, { flats, pagination }] = await Promise.all([
    getFlatsFiltersData(),
    getFlats(searchParams),
  ]);

  const viewType = searchParams.viewType as ViewType;

  const renderFlatsView = () => {
    return viewType === 'map' ? (
      <FlatsMap flats={flats} />
    ) : (
      <FlatsList flats={flats} pagination={pagination!} />
    );
  };
  return (
    <>
      <FlatsFilters data={data} />
      {renderFlatsView()}
    </>
  );
};

export default Flats;
