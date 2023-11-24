import FlatPage from '@/src/app-pages/FlatsPage/FlatPage';
import { formatToDetailedFlat } from '@/src/helpers/formatters';
import { getFlatById } from '@/src/services/flatsServices';
import { FlatStrapiResponse, StrapiFindOneResponse } from '@/src/types/StrapiTypes';

interface FlatPageProps {
  params: {
    id: string;
  };
}

const getFlat = async (id: string) => {
  const response = await fetch(`https://marielt.site/api/apart-items/${id}?populate=*`, {
    cache: 'no-cache',
  });

  const { data } = (await response.json()) as StrapiFindOneResponse<FlatStrapiResponse>;
  return formatToDetailedFlat(data);
};

const page = async ({ params: { id } }: FlatPageProps) => {
  const flat = await getFlat(id);
  // const flat = await getFlatById(id);

  // console.log('Flat by id:', { id, flat });
  return <FlatPage flat={flat} />;
};

export default page;
