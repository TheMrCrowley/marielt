'use client';

import React from 'react';

import { FlatsFiltersType } from '@/types/Filters';

import FlatsContextProvider from './FlatsContextProvider';
import FlatsFilter from './FlatsFilter';

interface FlatsWithContextProps {
  filtersData: FlatsFiltersType['data'];
}

const FlatsWithContext = ({ filtersData }: FlatsWithContextProps) => {
  return (
    <FlatsContextProvider filtersData={filtersData}>
      <FlatsFilter />
    </FlatsContextProvider>
  );
};

export default FlatsWithContext;
