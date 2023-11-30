import FlatPage from '@/src/app-pages/FlatsPage/FlatPage';
import { getFlatById } from '@/src/services/flatsServices';

interface FlatPageProps {
  params: {
    id: string;
  };
}

const page = async ({ params: { id } }: FlatPageProps) => {
  const flat = await getFlatById(id);

  return <FlatPage flat={flat} />;
};

export default page;
