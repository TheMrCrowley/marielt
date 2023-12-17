import { Metadata } from 'next';
import React from 'react';

import SalesImage from '@/public/sales-bg.jpg';
import StaticPage from '@/src/app-pages/CareersPage/StaticPage';
import { canonicalUrlMap, getOpenGraphField } from '@/src/services/seoServices';

const title = 'Кто такой - Руководитель отдела продаж?';

const description =
  'Риэлтор - надежный гид в мире недвижимости. Он приносит множество преимуществ как при продаже, так и при покупке квартиры.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrlMap.salesPage(),
  },
  openGraph: getOpenGraphField(title, description),
};

const page = () => {
  return <StaticPage description={description} title={title} imageUrl={SalesImage} />;
};

export default page;
