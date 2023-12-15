import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';

import Button from '@/src/components/common/Button';
import { CurrencyState } from '@/src/store/currency';
import { DetailedCommercialItem } from '@/src/types/Commercial';

import CommercialPDFPreview from './CommercialPDFPreview';

const CommercialPDFDownloadButton = ({
  commercialItem,
  rates,
}: {
  commercialItem: DetailedCommercialItem;
  rates: CurrencyState['rates'];
}) => {
  return (
    <section className="flex-auto h-80 w-full flex justify-center items-center">
      <PDFDownloadLink
        document={<CommercialPDFPreview rates={rates} commercialItem={commercialItem} />}
        fileName="doc.pdf"
      >
        {({ loading }) => <Button>{loading ? 'Загрузка...' : 'Скачать презентацию'}</Button>}
      </PDFDownloadLink>
    </section>
  );
};

export default CommercialPDFDownloadButton;
