import { Metadata } from 'next';
import React from 'react';

import AgentPage from '@/src/app-pages/AgentPage';
import { getAgentPageData } from '@/src/services/careersServices';
import { canonicalUrlMap, getOpenGraphField, getSeoFields } from '@/src/services/seoServices';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('agentPage');
  const canonical = canonicalUrlMap.agentPage();

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(seo.title, seo.description),
  };
}

const page = async () => {
  const data = await getAgentPageData();

  return <AgentPage data={data} />;
};

export default page;
