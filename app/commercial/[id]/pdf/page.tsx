import React from 'react';

import CommercialPDF from '@/src/components/CommercialPDF';
import { getCommercialById } from '@/src/services/commercialServices';

type Props = {
  params: {
    id: string;
  };
};

const PdfExport = async ({ params: { id } }: Props) => {
  const item = await getCommercialById(id);

  return <CommercialPDF item={item} />;
};

export default PdfExport;
