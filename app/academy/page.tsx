import { Metadata } from 'next';
import React from 'react';

import { getSeoFields } from '@/src/services/seoServices';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('academyPage');

  return {
    title: seo?.title || 'Academy Static Title',
    description: seo?.description || 'Static Academy Description',
  };
}

const Academy = () => {
  return <div>Academy</div>;
};

export default Academy;
