import { Metadata } from 'next';
import React from 'react';

import AboutPage from '@/src/app-pages/AboutPage/AboutPage';
import { getAbout } from '@/src/services/aboutServices';
import { canonicalUrlMap, getOpenGraphField, getSeoFields } from '@/src/services/seoServices';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('aboutPage');

  const canonical = canonicalUrlMap.aboutPage();
  const title = seo.title || 'О Marielt';
  const description = seo.description || 'Описание страницы о Marielt';

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(title, description),
  };
}

const About = async () => {
  const data = await getAbout();
  return <AboutPage aboutData={data} />;
};

export default About;
