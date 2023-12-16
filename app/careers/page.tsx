import { Metadata } from 'next';

import CareersPage from '@/src/app-pages/CareersPage';
import { getCareers } from '@/src/services/careersServices';
import { canonicalUrlMap, getSeoFields } from '@/src/services/seoServices';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('careersPage');
  const canonical = canonicalUrlMap.careersPage();

  const title = seo?.title || 'Вакансии';
  const description = seo?.description || 'Static Careers Description';

  return {
    title,
    description,
    alternates: {
      canonical,
    },
  };
}

const Careers = async () => {
  const data = await getCareers();

  return <CareersPage careersData={data} />;
};

export default Careers;
