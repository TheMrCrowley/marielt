import { Metadata } from 'next';

import CommercialPage from '@/src/app-pages/CommercialPage/CommercialPage';
import { getCommSeoFields, getCommercialById } from '@/src/services/commercialServices';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { seo } = await getCommSeoFields(id);

  return {
    title: seo.title,
    description: seo.description,
  };
}

const Commercial = async ({ params: { id } }: Props) => {
  const commercialItem = await getCommercialById(id);

  return <CommercialPage commercial={commercialItem} />;
};

export default Commercial;
