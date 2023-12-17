import { Metadata } from 'next';
import React from 'react';

import DubaiPage from '@/src/app-pages/Dubai/DubaiPage';
import { canonicalUrlMap, getOpenGraphField, getSeoFields } from '@/src/services/seoServices';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('dubaiPage');
  const canonical = canonicalUrlMap.dubaiPage();

  const title = seo?.title || 'Marielt DUBAI';
  const description = seo?.description || 'Static Dubai Description';

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(title, description),
  };
}

export default function Page() {
  return <DubaiPage />;
}
