import { Metadata } from 'next';

import CareersPage from '@/src/app-pages/CareersPage';
import { getCareers } from '@/src/services/careersServices';
import { getSeoFields } from '@/src/services/seoServices';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('careersPage');

  return {
    title: seo?.title || 'Careers Static Title',
    description: seo?.description || 'Static Careers Description',
  };
}

const Careers = async () => {
  const data = await getCareers();

  return <CareersPage careersData={data} />;
};

export default Careers;
