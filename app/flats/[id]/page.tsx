import { Metadata } from 'next';

import { FlatItemsStrapiResponse } from '@/src/api/flats';
import FlatPage from '@/src/app-pages/FlatsPage/FlatPage';
import { getFlatById, getFlatByIdSeoData } from '@/src/services';
import { canonicalUrlMap, getOpenGraphField } from '@/src/services/seoServices';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { seo, image } = await getFlatByIdSeoData(id);
  const canonical = canonicalUrlMap.apartPageId(id);

  const title = seo.title || 'Купить квартиру в Минске';

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(title, seo.description, image?.url),
  };
}

export async function generateStaticParams() {
  const response = await fetch(`${process.env.API_BASE_URL}/apart-items?pagination[limit]=-1`, {
    cache: 'no-cache',
  });

  const { data } = (await response.json()) as FlatItemsStrapiResponse;

  return data.map((item) => ({
    id: item.id.toString(),
  }));
}

export const dynamicParams = true;

const page = async ({ params: { id } }: Props) => {
  const flat = await getFlatById(id);

  return <FlatPage flat={flat} />;
};

export default page;
