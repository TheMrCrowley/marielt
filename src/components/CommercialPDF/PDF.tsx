'use client';

import { PDFViewer } from '@react-pdf/renderer';
import pdfobject from 'pdfobject';
import React from 'react';

import { useCurrency } from '@/src/store/currency';
import { DetailedCommercialItem } from '@/src/types/Commercial';

import CommercialPDFDownloadButton from './CommercialPDFDownloadButton';
import CommercialPDFPreview from './CommercialPDFPreview';

const PDF = ({ commercialItem }: { commercialItem: DetailedCommercialItem }) => {
  const { rates } = useCurrency();
  const isPossibleToShow = pdfobject.supportsPDFs;

  if (isPossibleToShow) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-50 max-w-[100vw] max-h-[100vh] overflow-hidden">
        <PDFViewer showToolbar width={'100%'} height={'100%'}>
          <CommercialPDFPreview rates={rates} commercialItem={commercialItem} />
        </PDFViewer>
      </div>
    );
  }

  return <CommercialPDFDownloadButton commercialItem={commercialItem} rates={rates} />;
};

export default PDF;
