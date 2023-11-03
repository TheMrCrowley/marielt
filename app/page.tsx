import clsx from 'clsx';

import LeaveApplicationSection from '@/components/LeaveApplicationSection';
import OpportunityPreview from '@/components/OpportunityPreview';
import ProductPreview from '@/components/ProductPreview';
import WelcomeSection from '@/components/WelcomeSection';
import { getHomePageData } from '@/services/homePage';

const Home = async () => {
  const { opportunityItems, productItems, welcomeSectionItem } = await getHomePageData();

  return (
    <>
      <WelcomeSection data={welcomeSectionItem} />
      <section className={clsx('w-full', 'pt-[100px]')}>
        {productItems.map((item) => (
          <ProductPreview key={item.to} data={item} />
        ))}
      </section>
      <LeaveApplicationSection />
      <section className={clsx('w-full', 'pt-[100px]')}>
        {opportunityItems.map((opportunity) => (
          <OpportunityPreview key={opportunity.to} opportunity={opportunity} />
        ))}
      </section>
    </>
  );
};

export default Home;
