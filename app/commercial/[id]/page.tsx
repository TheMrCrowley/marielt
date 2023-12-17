import { Metadata } from 'next';

import CommercialPage from '@/src/app-pages/CommercialPage/CommercialPage';
import { getCommSeoFields, getCommercialById } from '@/src/services/commercialServices';
import { canonicalUrlMap, getOpenGraphField } from '@/src/services/seoServices';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { seo, image } = await getCommSeoFields(id);
  const canonical = canonicalUrlMap.commPageId(id);

  const title = seo.title;
  const description = seo.description;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: getOpenGraphField(title, description, image),
  };
}

const Commercial = async ({ params: { id } }: Props) => {
  const commercialItem = await getCommercialById(id);

  return <CommercialPage commercial={commercialItem} />;
};

export default Commercial;
