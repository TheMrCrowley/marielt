import { Metadata } from 'next';
import React from 'react';

import RealtorImage from '@/public/realtor-bg.jpg';
import StaticPage from '@/src/app-pages/CareersPage/StaticPage';
import { canonicalUrlMap } from '@/src/services/seoServices';

const title = 'Кто такой - Риэлтор?';
const description =
  'Риэлтор - надежный гид в мире недвижимости. Он приносит множество преимуществ как при продаже, так и при покупке квартиры.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrlMap.realtorPage(),
  },
};

const page = () => {
  return <StaticPage description={description} title={title} imageUrl={RealtorImage} />;
};

export default page;
