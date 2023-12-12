import { Metadata } from 'next';
import React from 'react';

import AcademyPage from '@/src/app-pages/Academy/AcademyPage';
import { getSeoFields } from '@/src/services/seoServices';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('academyPage');

  return {
    title: seo?.title || 'Academy Static Title',
    description: seo?.description || 'Static Academy Description',
  };
}

const Academy = () => {
  return <AcademyPage />;
};

export default Academy;
