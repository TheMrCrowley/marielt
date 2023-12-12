import { Metadata } from 'next';
import React from 'react';

import DubaiPage from '@/src/app-pages/Dubai/DubaiPage';
import { getSeoFields } from '@/src/services/seoServices';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('dubaiPage');

  return {
    title: seo?.title || 'Dubai Static Title',
    description: seo?.description || 'Static Dubai Description',
  };
}

export default function Page() {
  return <DubaiPage />;
}
