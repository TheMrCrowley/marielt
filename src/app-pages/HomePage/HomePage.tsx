import clsx from 'clsx';
import React from 'react';

import { HomePageData } from '@/src/types/HomePage';

import LeaveApplicationSection from './components/LeaveApplicationSection';
import OpportunityPreview from './components/OpportunityPreview';
import ProductPreview from './components/ProductPreview';
import WelcomeSection from './components/WelcomeSection';

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
