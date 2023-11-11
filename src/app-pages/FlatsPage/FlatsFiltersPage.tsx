import React from 'react';

import { FlatsFiltersType } from '@/src/store/flatsFilters';
import { DefaultFlatItem } from '@/src/types/Flats';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

import FlatsFilters from './FlatsFilters';
import FlatsList from './FlatsList';

interface FlatsFiltersProps {
  data: FlatsFiltersType['data'];
  flats: DefaultFlatItem[];
  pagination: StrapiFindResponse<{}>['meta']['pagination'];
}

const FlatsFiltersPage = ({ data, flats, pagination }: FlatsFiltersProps) => {
  return (
    <>
      <FlatsFilters data={data} />
      <FlatsList flats={flats} pagination={pagination} />
    </>
  );
};

export default FlatsFiltersPage;
