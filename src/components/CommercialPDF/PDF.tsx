'use client';

import pdfobject from 'pdfobject';
import React from 'react';

import Loader from '@/src/components/common/Loader';
import { LoadFunctionType, useLoadComponent } from '@/src/hooks/useLoadComponent';
import { CurrencyState, useCurrency } from '@/src/store/currency';
import { DetailedCommercialItem } from '@/src/types/Commercial';

const loadComponent =
  ({
    commercialItem,
    rates,
  }: {
    commercialItem: DetailedCommercialItem;
    rates: CurrencyState['rates'];
  }): LoadFunctionType =>
  async (setComponent) => {
    const isPossibleToShow = pdfobject.supportsPDFs;

    if (isPossibleToShow) {
      const CommercialPDFPreview = (await import('./CommercialPDFPreview')).default;

      setComponent(<CommercialPDFPreview commercialItem={commercialItem} rates={rates} />);
    } else {
      const CommercialPDFDownloadButton = (await import('./CommercialPDFDownloadButton')).default;

      setComponent(<CommercialPDFDownloadButton commercialItem={commercialItem} rates={rates} />);
    }
  };

const PDF = ({ commercialItem }: { commercialItem: DetailedCommercialItem }) => {
  const { rates } = useCurrency();
  const { component, isLoaded } = useLoadComponent(loadComponent({ commercialItem, rates }));

  if (!isLoaded) {
    return <Loader />;
  }

  return component;
};

export default PDF;
