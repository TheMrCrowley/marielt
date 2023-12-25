import { AbstractTeamPageApi } from '@/src/api/TeamPageApi';

const getTeamPageDataFetchFunction = (api: AbstractTeamPageApi) => async (): Promise<string> => {
  const description = await api.getTeamPageDescription();

  return description;
};

export default getTeamPageDataFetchFunction;
