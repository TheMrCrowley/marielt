import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React from 'react';

import { AgentPageData } from '@/src/types/CareersTypes';

import AdvantageSection from './components/AdvantageSection';
import CareerPerspectiveSection from './components/CareerPerspectiveSection';
import MainPointSection from './components/MainPointSection';
import PerspectiveJobSection from './components/PerspectiveJobSection';
import PerspectiveSection from './components/PerspectiveSection';
import WelcomeSection from './components/WelcomeSection';

const AgentVideo = dynamic(() => import('./components/AgentVideoSection'));
const AgentPageSlider = dynamic(() =>
  import('@/src/components/Swiper').then((mod) => mod.AgentPageSlider),
);

interface AgentPageProps {
  data: AgentPageData;
}

const AgentPage = ({ data }: AgentPageProps) => {
  const { media, agentVideo, courseVideo } = data;

  return (
    <section className={clsx('w-full', 'flex', 'flex-col', 'sm:gap-8', 'gap-4')}>
      <WelcomeSection />
      <MainPointSection />
      {agentVideo && <AgentVideo video={agentVideo} />}
      <PerspectiveJobSection />
      <AdvantageSection />
      {media.length && <AgentPageSlider media={media} />}
      <PerspectiveSection />
      <CareerPerspectiveSection />
    </section>
  );
};

export default AgentPage;
