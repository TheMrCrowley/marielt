'use client';

import React from 'react';

import Button from '@/src/components/common/Button';
import Loader from '@/src/components/common/Loader';
import { LoadFunctionType, useLoadComponent } from '@/src/hooks/useLoadComponent';
import { CurrencyState } from '@/src/store/currency';
import { DetailedCommercialItem } from '@/src/types/Commercial';

type CommercialPDFDownloadButtonProps = {
  commercialItem: DetailedCommercialItem;
  rates: CurrencyState['rates'];
};

const loadComponent =
  ({ commercialItem, rates }: CommercialPDFDownloadButtonProps): LoadFunctionType =>
  async (setComponent) => {
    const PDFDownloadLink = (await import('@react-pdf/renderer')).PDFDownloadLink;
    const CommercialPDFDocument = (await import('./CommercialPDFDocument')).default;

    setComponent(
      <section className="flex-auto h-80 w-full flex justify-center items-center">
        <PDFDownloadLink
          document={<CommercialPDFDocument rates={rates} commercialItem={commercialItem} />}
          fileName="doc.pdf"
        >
          {({ loading }) => <Button>{loading ? 'Загрузка...' : 'Скачать презентацию'}</Button>}
        </PDFDownloadLink>
      </section>,
    );
  };

const CommercialPDFDownloadButton = (props: CommercialPDFDownloadButtonProps) => {
  const { component, isLoaded } = useLoadComponent(loadComponent(props));

  if (!isLoaded) {
    return <Loader />;
  }

  return component;
};

export default CommercialPDFDownloadButton;
