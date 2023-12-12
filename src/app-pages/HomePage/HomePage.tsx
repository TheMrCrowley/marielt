import clsx from 'clsx';
import React from 'react';

import { HomePageData } from '@/src/types/HomePage';

import LeaveApplicationSection from './LeaveApplicationSection';
import OpportunityPreview from './OpportunityPreview';
import ProductPreview from './ProductPreview';
import WelcomeSection from './WelcomeSection';

type HomePageProps = {
  data: HomePageData;
};

const HomePage = ({ data }: HomePageProps) => {
  const { opportunities, products, welcomeSection } = data;
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
