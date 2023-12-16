'use client';

import React from 'react';

import Loader from '@/src/components/common/Loader';
import { useDisableScroll } from '@/src/hooks/useDisableScroll';
import { LoadFunctionType, useLoadComponent } from '@/src/hooks/useLoadComponent';
import { CurrencyState } from '@/src/store/currency';
import { DetailedCommercialItem } from '@/src/types/Commercial';

type CommercialPDFPreviewProps = {
  commercialItem: DetailedCommercialItem;
  rates: CurrencyState['rates'];
};

const loadComponent =
  ({ rates, commercialItem }: CommercialPDFPreviewProps): LoadFunctionType =>
  async (setComponent) => {
    const PDFViewer = (await import('@react-pdf/renderer')).PDFViewer;
    const CommercialPDFDocument = (await import('./CommercialPDFDocument')).default;

    setComponent(
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-50 max-w-[100vw] max-h-[100vh] overflow-hidden">
        <PDFViewer showToolbar width={'100%'} height={'100%'}>
          <CommercialPDFDocument rates={rates} commercialItem={commercialItem} />
        </PDFViewer>
      </div>,
    );
  };

const CommercialPDFPreview = (props: CommercialPDFPreviewProps) => {
  const { component, isLoaded } = useLoadComponent(loadComponent(props));

  useDisableScroll();

  if (!isLoaded) {
    return <Loader />;
  }

  return component;
};

export default CommercialPDFPreview;
