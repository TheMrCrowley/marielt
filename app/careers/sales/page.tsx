import { Metadata } from 'next';
import React from 'react';

import SalesPage from '@/src/app-pages/CareersPage/SalesPage';
import { canonicalUrlMap, getOpenGraphField } from '@/src/services/seoServices';

const title = 'Руководитель отдела продаж';

const description =
  'Это джедай продаж и менеджмента. По крайней мере у нас в команде только такие) Узнайте как вы можете стать руководителем в нашей компании, какие знания и навыки вам необходимо иметь и как их можно получить! ';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrlMap.salesPage(),
  },
  openGraph: getOpenGraphField(title, description),
};

const page = () => {
  return <SalesPage description={description} title={title} />;
};

export default page;
