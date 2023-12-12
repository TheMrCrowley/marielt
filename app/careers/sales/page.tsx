import { Metadata } from 'next';
import React from 'react';

import SalesImage from '@/public/sales-bg.jpg';
import StaticPage from '@/src/app-pages/CareersPage/StaticPage';

export const metadata: Metadata = {
  title: 'Static Sales Title',
  description: 'Static Sales Description',
};

const page = () => {
  return (
    <StaticPage
      description="Риэлтор - надежный гид в мире недвижимости. Он приносит множество преимуществ как при продаже, так и при покупке квартиры."
      title="Кто такой - Руководитель отдела продаж?"
      imageUrl={SalesImage}
    />
  );
};

export default page;
