import React from 'react';

import PDF from '@/src/components/CommercialPDF/PDF';
import { getCommercialById } from '@/src/services';

type Props = {
  params: {
    id: string;
  };
};

const PdfExport = async ({ params: { id } }: Props) => {
  const item = await getCommercialById(id);

  return <PDF commercialItem={item} />;
};

export default PdfExport;
