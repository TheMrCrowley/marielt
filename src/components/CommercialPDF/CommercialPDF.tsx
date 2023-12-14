'use client';

import pdfobject from 'pdfobject';
import { useEffect, useState } from 'react';

import Button from '@/src/components/common/Button';
import { DetailedCommercialItem } from '@/src/types/Commercial';

import Roboto from './PTSans-normal';
import { getPDFTemplate } from './getPDFTemplate';

const CommercialPDF = ({ item }: { item: DetailedCommercialItem }) => {
  const [pdfState, setPDFState] = useState<{
    url: string;
    download: (() => void) | null;
  }>({
    url: '',
    download: null,
  });

  const isPossibleToShow = pdfobject.supportsPDFs;

  useEffect(() => {
    generatePdf(item);
  }, []);

  useEffect(() => {
    if (pdfState.url && isPossibleToShow) {
      pdfobject.embed(pdfState.url, document.body, {
        supportRedirect: true,
      });
    }
  }, [pdfState]);

  const generatePdf = async (target: DetailedCommercialItem) => {
    const jsPDF = (await import('jspdf')).default;

    const doc = new jsPDF({ unit: 'px' });
    doc.addFileToVFS('PTSans.ttf', Roboto);
    doc.addFont('PTSans.ttf', 'PTSans', 'normal');
    doc.setFont('PTSans');

    doc.html(getPDFTemplate(target), {
      margin: 0,
      autoPaging: true,
      callback: (completed) => {
        if (isPossibleToShow) {
          setPDFState((prev) => ({
            ...prev,
            url: completed.output('dataurlstring', {
              filename: 'presentation.pdf',
            }),
          }));
        } else {
          setPDFState((prev) => ({ ...prev, download: completed.save }));
        }
      },
    });
  };

  if (!pdfState.download) {
    return null;
  }

  return (
    <section className="flex-auto h-80 w-full flex justify-center items-center">
      <Button
        onClick={() => {
          pdfState.download?.();
        }}
      >
        Скачать презентацию
      </Button>
    </section>
  );
};

export default CommercialPDF;
