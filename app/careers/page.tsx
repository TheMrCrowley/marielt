import { Metadata } from 'next';

import CareersPage from '@/src/app-pages/CareersPage';
import { getCareersPageData } from '@/src/services';
import { canonicalUrlMap, getOpenGraphField, getSeoFields } from '@/src/services/seoServices';

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
    openGraph: getOpenGraphField(title, description),
  };
}

const Careers = async () => {
  const data = await getCareersPageData();

  return <CareersPage careersData={data} />;
};

export default Careers;
