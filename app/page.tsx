import { Metadata } from 'next';

import HomePage from '@/src/app-pages/HomePage';
import { getHomePageData } from '@/src/services/homePageServices';
import { getSeoFields } from '@/src/services/seoServices';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('homePage');

  return {
    title: seo?.title || 'Home Static Titles',
    description: seo?.description || 'Static Home Description',
  };
}

const Home = async () => {
  const data = await getHomePageData();

  return <HomePage data={data} />;
};

export default Home;
