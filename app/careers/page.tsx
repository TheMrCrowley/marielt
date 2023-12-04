import CareersPage from '@/src/app-pages/CareersPage';
import { getCareers } from '@/src/services/careersServices';

const Careers = async () => {
  const data = await getCareers();

  return <CareersPage careersData={data} />;
};

export default Careers;
