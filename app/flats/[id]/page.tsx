import ApplicationField from '@/src/components/ApplicationField/ApplicationField';
import ProductPageContent from '@/src/components/ProductPageContent/ProductPageContent';
import { getFlatById } from '@/src/services/flatsServices';

interface FlatPageProps {
  params: {
    id: string;
  };
}

const FlatPage = async ({ params: { id } }: FlatPageProps) => {
  const flat = await getFlatById(id);

  console.log('Flat by id:', { id, flat });
  return (
    <>
      <ProductPageContent flat={flat} />,
      <ApplicationField />
    </>
  );
};

export default FlatPage;
