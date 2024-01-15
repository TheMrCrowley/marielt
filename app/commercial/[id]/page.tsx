import { Metadata } from 'next';

import { CommercialItemsStrapiResponse } from '@/src/api/commercial';
import CommercialPage from '@/src/app-pages/CommercialPage/CommercialPage';
import { getCommercialById, getCommercialByIdSeoFields } from '@/src/services';
import { canonicalUrlMap, getOpenGraphField } from '@/src/services/seoServices';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { seo, image } = await getCommercialByIdSeoFields(id);
  const canonical = canonicalUrlMap.commPageId(id);

  const title = seo.title || 'Коммерческая недвижимость';
  const description = seo.description;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(title, description, image?.url),
  };
}

export async function generateStaticParams() {
  const response = await fetch(`${process.env.API_BASE_URL}/comm-items?pagination[limit]=-1`, {
    cache: 'no-cache',
  });

  const { data } = (await response.json()) as CommercialItemsStrapiResponse;

  return data.map((item) => ({
    id: item.id.toString(),
  }));
}

export const dynamicParams = true;

const Commercial = async ({ params: { id } }: Props) => {
  const commercialItem = await getCommercialById(id);

  return <CommercialPage commercial={commercialItem} />;
};

export default Commercial;
