import { Metadata } from 'next';
import React from 'react';

import AcademyPage from '@/src/app-pages/Academy/AcademyPage';
import { canonicalUrlMap, getSeoFields } from '@/src/services/seoServices';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('academyPage');
  const canonical = canonicalUrlMap.academyPage();

  const title = seo?.title || 'Академия Мариэлт';
  const description = seo?.description || 'Описание Страницы Академии Мариэлт';

  return {
    title,
    description,
    alternates: {
      canonical,
    },
  };
}

const Academy = () => {
  return <AcademyPage />;
};

export default Academy;
