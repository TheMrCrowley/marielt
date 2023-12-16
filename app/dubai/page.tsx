import { Metadata } from 'next';
import React from 'react';

import DubaiPage from '@/src/app-pages/Dubai/DubaiPage';
import { canonicalUrlMap, getSeoFields } from '@/src/services/seoServices';

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
  };
}

export default function Page() {
  return <DubaiPage />;
}
