import { Metadata } from 'next';
import React from 'react';

import DocsPage from '@/src/app-pages/DocsPage';
import { canonicalUrlMap, getOpenGraphField, getSeoFields } from '@/src/services/seoServices';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('docPage');

  const canonical = canonicalUrlMap.aboutPage();
  const title = seo.title || 'Документы';
  const description = seo.description || 'Все прозрачно - нам нечего скрывать';

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(title, description),
  };
}

const Docs = () => {
  return <DocsPage />;
};

export default Docs;
