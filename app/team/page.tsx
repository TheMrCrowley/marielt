import { Metadata } from 'next';
import React from 'react';

import TeamPage from '@/src/app-pages/TeamPage';
import { getTeamMembers, getTeamPageData } from '@/src/services';
import { getSeoFields, canonicalUrlMap, getOpenGraphField } from '@/src/services/seoServices';

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

const Team = async () => {
  const [description, members] = await Promise.all([getTeamPageData(), getTeamMembers()]);

  return <TeamPage description={description} members={members} />;
};

export default Team;
