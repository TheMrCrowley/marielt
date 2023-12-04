import CommercialPage from '@/src/app-pages/CommercialPage/CommercialPage';
import { getCommercialById } from '@/src/services/commercialServices';

interface CommercialProps {
  params: {
    id: string;
  };
}

const Commercial = async ({ params: { id } }: CommercialProps) => {
  const commercialItem = await getCommercialById(id);

  return <CommercialPage commercial={commercialItem} />;
};

export default Commercial;
