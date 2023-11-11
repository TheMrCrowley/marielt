import React from 'react';

import { CommercialFiltersType } from '@/src/store/commercialFilters';
import { DefaultCommercialItem } from '@/src/types/Commercial';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

import CommercialFilters from './CommercialFilters';
import CommercialList from './CommercialList';

interface CommercialPageProps {
  data: CommercialFiltersType['data'];
  commercial: DefaultCommercialItem[];
  pagination: StrapiFindResponse<{}>['meta']['pagination'];
}

const CommercialPage = ({ commercial, data, pagination }: CommercialPageProps) => {
  return (
    <>
      <CommercialFilters data={data} />
      <CommercialList commercial={commercial} pagination={pagination} />
    </>
  );
};

export default CommercialPage;
