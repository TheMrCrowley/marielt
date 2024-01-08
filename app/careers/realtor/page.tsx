import { Metadata } from 'next';
import React from 'react';

import RealtorPage from '@/src/app-pages/CareersPage/RealtorPage';
import { canonicalUrlMap, getOpenGraphField } from '@/src/services/seoServices';

const title = 'Риэлтер';
const description =
  'Риэлтер - это юрист который занимается юридическим сопровождением сделок с недвижимостью. Узнайте подробнее как им можно стать в нашей компании. ';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrlMap.realtorPage(),
  },
  openGraph: getOpenGraphField(title, description),
};

const page = () => {
  return <RealtorPage title={title} description={description} />;
};

export default page;
