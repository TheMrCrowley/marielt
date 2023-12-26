import { AbstractAgentPageApi } from '@/src/api/agentPage';
import { convertToAgentPageData } from '@/src/helpers/agentPage/agentPageHelpers';
import { AgentPageData } from '@/src/types/CareersTypes';

const getAgentPageDataFetchFunction =
  (api: AbstractAgentPageApi) => async (): Promise<AgentPageData> => {
    const { data } = await api.getAgentPageData();

    return convertToAgentPageData(data);
  };

export default getAgentPageDataFetchFunction;
