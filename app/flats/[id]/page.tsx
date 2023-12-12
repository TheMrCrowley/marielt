import { Metadata } from 'next';

import FlatPage from '@/src/app-pages/FlatsPage/FlatPage';
import { getFlatById, getFlatSeoFields } from '@/src/services/flatsServices';
import { FlatStrapiResponse } from '@/src/types/Flats';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { seo } = await getFlatSeoFields(id);

  return {
    title: seo.title,
    description: seo.description,
  };
}

export async function generateStaticParams() {
  const response = await fetch('https://marielt.site/api/apart-items?pagination[limit]=-1');

  const { data } = (await response.json()) as StrapiFindResponse<FlatStrapiResponse>;

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
