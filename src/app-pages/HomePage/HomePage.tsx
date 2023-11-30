import clsx from 'clsx';
import React from 'react';

import { getHomePageData } from '@/src/services/homePageServices';

import LeaveApplicationSection from './LeaveApplicationSection';
import OpportunityPreview from './OpportunityPreview';
import ProductPreview from './ProductPreview';
import WelcomeSection from './WelcomeSection';

const HomePage = async () => {
  const { opportunities, products, welcomeSection } = await getHomePageData();

  return (
    <>
      <WelcomeSection data={welcomeSection} />
      <section className={clsx('w-full', 'py-8', 'flex', 'flex-col', 'gap-8')}>
        {products.map((item) => (
          <ProductPreview key={item.to} data={item} />
        ))}
      </section>
      <LeaveApplicationSection />
      <section className={clsx('w-full')}>
        {opportunities.map((opportunity) => (
          <OpportunityPreview key={opportunity.to} opportunity={opportunity} />
        ))}
      </section>
    </>
  );
};

export default HomePage;
