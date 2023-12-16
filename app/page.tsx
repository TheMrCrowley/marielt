import { Metadata } from 'next';

import HomePage from '@/src/app-pages/HomePage';
import { getHomePageData } from '@/src/services/homePageServices';
import { canonicalUrlMap, getSeoFields } from '@/src/services/seoServices';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoFields('homePage');
  const canonical = canonicalUrlMap.homePage();

  const title = seo.title || 'Marielt';
  const description = seo.description || '';

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      images: [
        {
          width: 'auto',
          height: 'auto',
          href: './opengraph-image.jpg',
          url: './opengraph-image.jpg',
          type: 'image/jpeg',
        },
      ],
    },
  };
}

const Home = async () => {
  const data = await getHomePageData();

  return <HomePage data={data} />;
};

export default Home;
