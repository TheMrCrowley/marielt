import { Metadata } from 'next';

import CommercialPage from '@/src/app-pages/CommercialPage/CommercialPage';
import { getCommSeoFields, getCommercialById } from '@/src/services/commercialServices';
import { canonicalUrlMap, getOpenGraphField } from '@/src/services/seoServices';
import { CommercialStrapiResponse } from '@/src/types/Commercial';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

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

// export async function generateStaticParams() {
//   const response = await fetch(`${process.env.API_BASE_URL}/comm-items?pagination[limit]=-1`);

//   const { data } = (await response.json()) as StrapiFindResponse<CommercialStrapiResponse>;

//   return data.map((item) => ({
//     id: item.id.toString(),
//   }));
// }

// export const dynamicParams = true;

const Commercial = async ({ params: { id } }: Props) => {
  const commercialItem = await getCommercialById(id);

  return <CommercialPage commercial={commercialItem} />;
};

export default Commercial;
