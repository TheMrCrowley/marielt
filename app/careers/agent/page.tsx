import React from 'react';

import AgentPage from '@/src/app-pages/AgentPage';
import { getAgentPageData } from '@/src/services/careersServices';

const page = async () => {
  const data = await getAgentPageData();

  return <AgentPage data={data} />;
};

export default page;
