import clsx from 'clsx';
import React from 'react';

import { getHomePageItems } from '@/src/services/homePageServices';

import LeaveApplicationSection from './LeaveApplicationSection';
import OpportunityPreview from './OpportunityPreview';
import ProductPreview from './ProductPreview';
import WelcomeSection from './WelcomeSection';

const HomePage = async () => {
  const { opportunityItems, productItems } = await getHomePageItems();

  return (
    <>
      <WelcomeSection />
      <section className={clsx('w-full', 'py-8', 'flex', 'flex-col', 'gap-8')}>
        {productItems.map((item) => (
          <ProductPreview key={item.to} data={item} />
        ))}
      </section>
      <LeaveApplicationSection />
      <section className={clsx('w-full')}>
        {opportunityItems.map((opportunity) => (
          <OpportunityPreview key={opportunity.to} opportunity={opportunity} />
        ))}
      </section>
    </>
  );
};

export default HomePage;
