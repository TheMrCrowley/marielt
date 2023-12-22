import { Metadata } from 'next';

import HomePage from '@/src/app-pages/HomePage';
import { getHomePageData } from '@/src/services/homePageServices';
import { canonicalUrlMap, getOpenGraphField, getSeoFields } from '@/src/services/seoServices';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('homePage');
  const canonical = canonicalUrlMap.homePage();

  const title = seo.title || 'Marielt';
  const description = seo.description || '';

  return {
    metadataBase: new URL(process.env.CANONICAL_URL as string),
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(title, description),
  };
}

const Home = async () => {
  const data = await getHomePageData();

  return <HomePage data={data} />;
};

export default Home;
